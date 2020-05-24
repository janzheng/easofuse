<script context="module">
	export async function preload({ params, query }) {

		return { slug: params.slug }
		// console.log('hey hey')
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		// const res = await this.fetch(`posts/${params.slug}`);
		// const data = await res.json();

		// if (res.status === 200) {
		// 	return { post: data };
		// } else {
		// 	this.error(res.status, data.message);
		// }
	}
</script>

<style>
	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}

	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}

	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}
</style>

<svelte:head>
	<!-- <title>{post.name}</title> -->
</svelte:head>

<!-- <h1>{post.name}</h1> -->


<div class="Home-content _section-page _padding-top-2 _margin-center ">
  <div class="_section-article _margin-center _margin-bottom-2">
		{#if post}
      <Post {post} showFullPost={true} />
		{/if}

		{#if !post}
			<h1>Post not found</h1>
			<!-- show random other posts / latest post? -->
		{/if}
	</div>
</div>




<script>
	import Cytosis from 'cytosis';
  import marked from 'marked';
  import Post from '../../components/Post.svelte';

  import { getContext } from 'svelte';

  export let slug 

  // Content passed down from layout
  const Content$ = getContext('Content')
  $: Content = $Content$
  let intro
	$: intro = Cytosis.findField('intro', Content, 'Markdown')
  
  let post
  const Posts$ = getContext('Posts')
  $: Posts = $Posts$
	$: post = Cytosis.findOne(slug, Posts, ['Slug'])

</script>



