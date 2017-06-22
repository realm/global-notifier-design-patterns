const Realm = require('realm')

// Unlock Professional Edition APIs
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || "YOUR_REALM_ACCESS_TOKEN";
Realm.Sync.setAccessToken(ACCESS_TOKEN);

// Insert the Realm admin token here
//   Linux:  cat /etc/realm/admin_token.base64
//   macOS:  cat realm-object-server/admin_token.base64
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'ADMIN_TOKEN';

// the URL to the Realm Object Server
const SERVER_URL = 'realm://127.0.0.1:9080';

// The regular expression you provide restricts the observed Realm files to only the subset you
// are actually interested in. This is done in a separate step to avoid the cost
// of computing the fine-grained change set if it's not necessary.
const NOTIFIER_PATH = '^/.*/myUser$';

/** 
*The callback is called for every observed Realm file whenever it
* has changes. It is called with a change event which contains the path, the Realm,
* a version of the Realm from before the change, and indexes indication all objects
* which were added, deleted, or modified in this change
* create the admin user
*/
const adminUser = Realm.Sync.User.adminUser(adminToken);


const UserSchema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
        _id: { type: 'string' },
        name: { type: 'string' },
        username: { type: 'string'},
        email: { type: 'string' },
        favoriteFood: { type: 'string'}
    }
}

/**
 * This is the global users realm
 */
const globalUsersDirectoryRealm = new Realm({
    sync: {
        user: adminUser,
        url: `${SERVER_URL}/globalUsers`
    },
    schema: [
        UserSchema
    ]
})

// register the event handler callback
Realm.Sync.addListener(SERVER_URL, adminUser, NOTIFIER_PATH, 'change', (changeEvent) => {
    // Extract the user ID from the virtual path, assuming that we're using
    // a filter which only subscribes us to updates of user-scoped Realms.
    var matches = changeEvent.path.match(/^\/([0-9a-f]+)\/myUser$/);
    var userId = matches[1];

    const realm = changeEvent.realm;
    const users = realm.objects('User');
    const userInsertionIndices = changeEvent.changes.User.insertions;
    const userModificationIndices = changeEvent.changes.User.modifications;
    const userDeletionIndices = changeEvent.changes.User.deletions

    for (const index of userInsertionIndices) {
        const insertedUserModel = users[index];
        globalUsersDirectoryRealm.write(() => {
            globalUsersDirectoryRealm.create('User', insertedUserModel, true)
        })
    }
    for (const index of userModificationIndices) {
        const modifiedUserModel = users[index];
        globalUsersDirectoryRealm.write(() => {
            globalUsersDirectoryRealm.create('User', insertedUserModel, true)
        })
    }
    for (const index of userDeletionIndices) {
        const modifiedUserModel = users[index];
        const foundGlobalUserModel = globalUsersDirectoryRealm.objectForPrimaryKey('User', modifiedUserModel._id)
        // Remember this can be null! So let's check before we delete it
        if (foundGlobalUserModel) {
            globalUsersDirectoryRealm.write(() => {
                globalUsersDirectoryRealm.delete(foundGlobalUserModel)
            })
        }
    }
});
