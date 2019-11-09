<div class="blog-post">
	<h2 class="blog-post-title"><?php the_title(); ?> test</h2>
	<p class="blog-post-meta"><?php the_date(); ?> by <a href="#"><?php the_author(); ?></a></p>

<div> test8 </div>
<?php echo $meta['date']; ?>
<?php echo $meta['text']; ?>

 <?php the_content(); ?>


</div><!-- /.blog-post -->