<script context="module">
  export async function preload(page, session) {
    const cytosis = await this.fetch(`cytosis.json`).then(r => r.json())
    const Content = cytosis.results['Content']
    const Posts = cytosis.results['Posts']

    return { Content, Posts };
  }
</script>


<script>
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';
	import head from '../_helpers/_head.js';

	// This trick passes down preloaded data to all modules
	// https://stackoverflow.com/questions/60911171/how-to-pass-data-from-a-layout-to-a-page-in-sapper
	// export const segment
	export let Content, Posts
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'

  const Content$ = writable(Content)
  $: $Content$ = Content
  setContext('Content', Content$)

  const Posts$ = writable(Posts)
  $: $Posts$ = Posts
  setContext('Posts', Posts$)
</script>



<svelte:head>
	{#if head}
		<title>{ head.title }</title>

		{#if head.link}
			{#each head.meta as meta}
				<meta 
					charset={meta.charset}
					data-hid={meta.hid} 
					name={meta.name} 
					content={meta.content} 
					property={meta.property} 
				>
			{/each}
			{#each head.link as link}
				<link data-hid={link.hid} rel={link.rel} href={link.href}>
			{/each}
		{/if}
	{/if}
</svelte:head>


<!-- <Nav {segment}/> -->

<div id="top" class="ContentFrame Layout">
	<Nav {Content}/>

	<main class="ContentFrame-body __content-frame">
		<slot ></slot>
	</main>

	<Footer {Content}></Footer>
</div>





<!-- 
<style type="text/scss">
  // // @import '../styles/core';
</style> -->



