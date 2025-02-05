<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'portfolio' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'kF.yMc-!zQg~q)Ph(Lt=[!uH:ya9z5fw<tmD&H:wHgH%T]H&@(C[p0gQr3DU(k78' );
define( 'SECURE_AUTH_KEY',  '3G9y~fX1H?eMw eHF3[q8Xfw2!l8ZJ})9q@Y0{-G6Rg_g2e;9L)^4v|hz-27d2O5' );
define( 'LOGGED_IN_KEY',    'sEv5!% }O{UPqs_cd-FM8s8X%ATDf>:e[P5UK{4,s[>aU?O@d~G~z{cE#&+qd.G<' );
define( 'NONCE_KEY',        '[A$N7z!hN  ;W&H-&Y/*vCTcVzTGWI}Ly ovjbp/URA[,#73)Ac`N,h~?5pnO`}Z' );
define( 'AUTH_SALT',        '#5}M,74DPVb4#}AH7wXvt3ed0&9?_NP]XcQg+Ua.PE=wj`oPN#eC9p_`OYjiZrsr' );
define( 'SECURE_AUTH_SALT', '/FU9Y|JK+2EhL;`3 ,629tFrj/3Ast/K={e>fYD4TrME#KNWnT(~G&Ly+irajmlC' );
define( 'LOGGED_IN_SALT',   'X.%L|4o(s;=/IzMJG.&9@XI ,!S[m:6pdp(^;zqT|}^!k.ZT *aM*zH-`r~,twOA' );
define( 'NONCE_SALT',       'x(xTDSIJh;0*p3~O-f.eV9^Cp06!UdD54s$7XPVyG9P%|ICe6OxuvPN[@q8t%xsi' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
