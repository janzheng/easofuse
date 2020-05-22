<script>
  import Cytosis from 'cytosis'
  import marked from 'marked'

  export let segment, Content;
  let content

  // $: if(Content) {
  // console.log('Content:', Content)
  content = Cytosis.findOne('header', Content ).fields['Markdown']
  // }

</script>
<!--
<nav>
	<ul>
		<li><a aria-current='{segment === undefined ? "page" : undefined}' href='.'>home</a></li>
		<li><a aria-current='{segment === "about" ? "page" : undefined}' href='about'>about</a></li>

		<!~~ for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen ~~>
		<li><a rel=prefetch aria-current='{segment === "blog" ? "page" : undefined}' href='blog'>blog</a></li>
	</ul>
</nav>

-->

<!-- 
<nav class="Header">
	Some nav stuff
</nav>

 -->

<nav class="Header __antialiased __content-header">
  <div class="Header-content _section-article _margin-center _padding-top _padding-bottom">
    <span class="_md-pfix">{@html marked(content)}</span>
  </div>
</nav>



<style type="text/scss">
	:global(img) {
		width: 64px;
    vertical-align: middle;
	}
</style>




