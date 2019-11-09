<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link href="<?php echo get_bloginfo('template_directory'); ?>/sari.css" rel="stylesheet">
</head>
<body>
    <div>
        Welcome to the sari-sari website
    </div>
    <div>
        This is a link to the <a href="<?php echo get_permalink( get_page_by_path( 'about-page' ) ) ?>">about page</a>
    </div>
    <div>
        <?php
			if ( have_posts() ) : while ( have_posts() ) : the_post();
                get_template_part( 'content', get_post_format() );
			    endwhile; endif;
		?>
    </div>
</body>
</html>