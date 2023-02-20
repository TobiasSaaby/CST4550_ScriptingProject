<script>
    import { enhance } from "$app/forms";

    /**
     * @type {{ error: any; }}
     */
     export let form;

</script>

<form use:enhance method="POST" action="?/register" class="flex mx-auto col-6">
<fieldset>
	<fieldset class="mb-3">
		<label for="username" class="form-label">Username</label>
		<input type="text" class="form-control" id="username" name="username" />
	</fieldset>

	<fieldset class="mb-3">
		<label for="password" class="form-label">Password</label>
		<input type="password" class="form-control" id="password" name="password" />
	</fieldset>

	<fieldset class="mb-3">
		<label for="repPassword" class="form-label">Repeat Password</label>
		<input type="repPassword" class="form-control" id="repPassword" name="repPassword" />
	</fieldset>

	<button type="submit" class="btn btn-primary">Submit</button>
	<div id="error_message" class="text-danger">
		<small>{form?.error}</small>
	</div>
</fieldset>
</form>

