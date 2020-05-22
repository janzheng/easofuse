



<script>
  import Cytosis from 'cytosis'
  import marked from 'marked'
  import dayjs from 'dayjs'

  // export let segment
  export let post


  const niceDate = dayjs(String(post.fields['Date'])).format('MMMM D, YYYY')

</script>


<div class="Post _margin-top-2 _margin-bottom-2">
  <div class="Post-Card _card _padding">
    <div class="Post-date _font-small">{niceDate}</div>
    {#if post.fields['URL']}
      {@html marked(post.fields['Content'])}
    {:else}
      {@html marked(post.fields['Content'])}
    {/if}
    <div class="Post-tags">
      <span class="_tag">tag here</span>
    </div>
  </div>
</div>



<style type="text/scss">

</style>