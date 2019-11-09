
	<div>
		<div>

           <?php
                    if ( have_posts() ) : while ( have_posts() ) : the_post();

                        get_template_part( 'page-content', get_post_format() );

                    endwhile; endif;
                    ?>

		</div>
	</div>