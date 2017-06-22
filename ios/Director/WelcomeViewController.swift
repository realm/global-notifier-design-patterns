//
//  ViewController.swift
//  Director
//
//  Created by Maximilian Alexander on 6/22/17.
//  Copyright © 2017 Maximilian Alexander. All rights reserved.
//

import UIKit
import Eureka

class WelcomeViewController: FormViewController {
    
    static let SERVER_URL = "SERVER_URL"
    static let USERNAME = "USERNAME"
    static let PASSWORD = "PASSWORD"
    static let BUTTON = "BUTTON"
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        title = "Directory"
        
        form +++ Section()
            <<< TextRow(WelcomeViewController.SERVER_URL) { row in
                row.title = "Server:"
            }
            <<< TextRow(WelcomeViewController.USERNAME) { row in
                row.title = "Username:"
            }
            <<< PasswordRow(WelcomeViewController.PASSWORD) { row in
                row.title = "Password:"
            }
            +++ Section()
            <<< ButtonRow(WelcomeViewController.BUTTON) { row in
                row.title = "Login or Register"
            }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
}

