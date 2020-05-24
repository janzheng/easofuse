



<script>
  import Cytosis from 'cytosis'
  import marked from 'marked'
  import dayjs from 'dayjs'

  // export let segment
  export let post
  export let showFullPost=false


  const niceDate = dayjs(String(post.fields['Date'])).format('MMMM D, YYYY')

</script>

<svelte:head>
  <link rel="canonical" href={`https://easeofuse.org/post/${post.fields['Status']}`} />
</svelte:head>

<div class="Post _margin-top-2 _margin-bottom-2">
  <div class="Post-Card _card _padding">

    {#if post.fields['Status'] == 'Preview'}
      <div class="Post-preview _margin-bottom"><span class="_tag">PREVIEW POST</span></div>
    {/if}

    <div class="Post-date _font-small">{niceDate}</div>

    {#if post.fields['LongContent'] && showFullPost}
      {@html marked(post.fields['LongContent'])}
    {:else}
      {@html marked(post.fields['Content'])}
    {/if}

    {#if post.fields['Tags']}
      <div class="Post-tags">
        {#each post.fields['Tags'] as tag (tag.id)}
          <span class="_tag">{ tag }</span>
        {/each}
      </div>
    {/if}

  </div>
</div>



<style type="text/scss">

</style>

