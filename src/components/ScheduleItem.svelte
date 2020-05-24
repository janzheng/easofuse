
<!-- temp hide anything not open -->
{#if schedule.fields['Status'] === 'Open'}

<div class="ScheduleItem _card _padding _margin-top-2 _divider-bottom">

	<div class="ScheduleItem-body _padding" >
	  <div class="ScheduleItem-header">
	  	<div>
	  		<span class="_tag" class:open={ schedule.fields['Status'] == 'Open' }>{ schedule.fields['Status'] }</span>
	  	</div>
	  	<h3>{ schedule.fields['Name'] } </h3>

	  	{#if schedule.fields['Description']}
    		{@html marked(schedule.fields['Description'])}
	  	{/if}

	  </div>

	  {#if schedule.fields['Status'] == 'Open'}
  		<div class="Formlet _padding-top-2" >
				<div class="_grid-2">
					<div class="Formlet Formlet-input _form-control _divider-bottom">
						<label for="name" class="_form-label">Your name</label>
						<input id="name" name="name" bind:value={name} placeholder="e.g. Jane H. Doe" required="required" type="text" class="_form-input __width-full"> 
					</div>

					<div class="Formlet Formlet-input _form-control _divider-bottom">
						<label for="email" class="_form-label">Your email</label>
						<input id="email" name="email" bind:value={email} placeholder="jane@phage.directory" required="required" type="email" class="_form-input __width-full"> 
					</div>
				</div>

				<div class="Formlet Formlet-input _padding-top _form-control _divider-bottom">
					<label for="topic" class="_form-label">Your presentation topic</label>
					<input id="topic" name="topic" bind:value={topic} placeholder="e.g. Phage manufacturing methods" required="required" type="text" class="_form-input __width-full"> 
				</div>

				<div class="_grid-2">
					<div>
						{#if registered}
							<div class="_padding-top">You're all signed up!</div>
						{/if}
					</div>
					<div class="_right">
						<input type="submit" value="Sign Up" class="_button __action  _margin-bottom-none" on:click|preventDefault={prereg}> 
					</div>
				</div>

			</div>

	  {:else if schedule.fields['Status'] == 'Awaiting Approval'}
	  	<!-- don't show much -->
	  {:else}
	  	<div> { schedule.fields['Name'] } / { schedule.fields['Topic'] } / { schedule.fields['Description'] }
	  	</div>
	  {/if}

		
	</div>

</div>


{/if}

<script>
	export let schedule
	import marked from 'marked'

	let name='', email='', topic='', registered

	export function prereg() {
		const data = {
			name,
			topic,
			email,
			schedule,
			mailer: {
				send: true,
		  	from: "\"Seminar Signup\" <seminars@mail.phage.directory>",
  			to: 'seminars@phage.directory',
				subject: `${name} Seminar Signup`,
  			text: `
  				New Seminar signup! \n 
  				Name: ${name}\n 
  				Email: ${email}\n 
  				Topic: ${topic}\n 
  			`
			}
		}

		const reg = fetch(
			`cytosis`, {
			headers: {
	      'Content-Type': 'application/json'
	    },
  		method: 'POST',
  		body: JSON.stringify(data)
  	}).then((res) => {
  		console.log('reg finished: ', res)
  		if(res.status == 200) {
  			registered = true
  			email = ''
  			name = ''
  			topic = ''
  		}
  	});
	}

</script>





