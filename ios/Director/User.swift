//
//  User.swift
//  Director
//
//  Created by Maximilian Alexander on 6/22/17.
//  Copyright © 2017 Maximilian Alexander. All rights reserved.
//

import Foundation
import RealmSwift

class User: Object {
    
    dynamic var _id: String = ""
    dynamic var name: String = ""
    dynamic var username: String = ""
    dynamic var email: String = ""
    dynamic var favoriteFood: String = ""
    
}

/**
 * These are data manipulation methiods
 */
extension User {
    
    
    static var myUserRealm: Realm  {
        let syncConfig = SyncConfiguration(user: SyncUser.current!, realmURL: URL(string: ""))
    
    }
    
    static func updateMyInfo(
        name: String,
        email: String,
        favoriteFood: String
    ){
        
    }
    
}
