



<script>
  import Cytosis from 'cytosis'
  import marked from 'marked'

  // export let segment
  export let Content
  let content

  // $: if(Content) {
  // console.log('Content:', Content)
  content = Cytosis.findOne('footer', Content ).fields['Markdown']
  // }
</script>


<footer class="Footer __antialiased __content-footer">
  <div class="Footer-content _section-page _margin-center _padding-top-2 _padding-bottom-2">
    {@html marked(content)}
  </div>
</footer>


