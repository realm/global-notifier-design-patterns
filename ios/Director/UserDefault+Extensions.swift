//
//  UserDefault+Extensions.swift
//  Director
//
//  Created by Maximilian Alexander on 6/22/17.
//  Copyright © 2017 Maximilian Alexander. All rights reserved.
//

import Foundation

extension UserDefaults {
    
    var authServerUrl: String {
    
        get {
            return self.string(forKey: "serverUrl") ?? "http://local"
        }
    }
    
}
