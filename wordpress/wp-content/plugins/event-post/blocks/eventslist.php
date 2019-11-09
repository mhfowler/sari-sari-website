<?php
/**
 * Functions to register client-side assets (scripts and stylesheets) for the
 * Gutenberg block.
 *
 * @package event-post
 */

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * @see https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type/#enqueuing-block-scripts
 * @since 5.2
 */
function eventpost_list_block_init() {
	global $EventPost;
	$dir = dirname( __FILE__ );

	wp_register_script(
		'eventpost-blocks',
		plugins_url( 'index.js', __FILE__ ),
		array(
			'wp-blocks',
			'wp-editor',
			'wp-components',
			'wp-i18n',
			'wp-element',
		)
	);
	wp_enqueue_script('eventpost-blocks');


	$block_js = 'eventslist/build/index.js';
	wp_register_script(
		'eventslist-block-editor',
		plugins_url( $block_js, __FILE__ ),
		array(
			'wp-blocks',
			'wp-editor',
			'wp-components',
			'wp-i18n',
			'wp-element',
		),
		filemtime( "$dir/$block_js" )
	);

	if ( function_exists('wp_set_script_translations') ) {
		wp_set_script_translations( 'eventslist-block-editor', 'event-post' );
	}

	$editor_css = 'eventslist/build/style.css';
	wp_register_style(
		'eventslist-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	register_block_type( 'eventpost/list', array(
		'editor_script' => 'eventslist-block-editor',
		'editor_style'  => 'eventslist-block-editor',
		'render_callback' => array($EventPost->Shortcodes, 'shortcode_list'),
	) );
}
add_action( 'init', 'eventpost_list_block_init' );
