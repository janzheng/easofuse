


<svelte:head>
</svelte:head>



<div class="Home">


  <div class="Home-content _section-page _padding-top-2 _margin-center ">
    <div class="_section-article _margin-center _margin-bottom-2">
      <div>{@html marked(intro)}</div>
    </div>

    <div class="Home-posts _section-article _margin-center">

      {#each Posts as post (post.id)}
        <Post {post}/>
      {/each}

    </div>

  </div>
</div>



<script>

	import Cytosis from 'cytosis';
  import marked from 'marked';
  import Post from '../components/Post.svelte';

  import { getContext } from 'svelte';

  // Content passed down from layout
  const Content$ = getContext('Content')
  $: Content = $Content$
  let intro
	$: intro = Cytosis.findField('intro', Content, 'Markdown')
  
  const Posts$ = getContext('Posts')
  $: Posts = $Posts$
  // let intro
  // $: intro = Cytosis.findField('intro', Posts, 'Markdown')
</script>

<!-- <style type="text/scss">
</style> -->
