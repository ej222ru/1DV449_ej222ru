<?php

/**
 * The settings file contains installation specific information
 * 
 */

class Settings {


	/**
	 * The app session name allows different apps on the same webhotel to share a virtual session
	 */
	const APP_SESSION_NAME = "KommunInfo";
	
	/**
	 * Username of default user
	 */
	const USERNAME = "Admin";

	/**
	 * Password of default user
	 */
	const PASSWORD = "Password";

	/**
	 * Path to folder writable by www-data but not accessable by webserver
	 */
	const DATAPATH = "./";

	/**
	 * Show errors 
	 * boolean true | false
	 */
	const DISPLAY_ERRORS = true;
}