<script>
	import { page } from '$app/stores';
</script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
<ui>
	<div>
		<ul>
			<li>
				<a class:active={$page.url.pathname === '/'} href="/" rel="external">Home</a>
			</li>

			{#if $page.data.user}
            <li style="float:right"><a class="fa fa-user">{"  " + $page.data.user}</a></li>
            <li style="float:right">
					<a href="/logout" >
						Log out
                    </a>
				</li>
			{:else}
				<li>
					<a href="/login" class:active={$page.url.pathname === '/login'}>
						Sign in
					</a>
				</li>

				<li>
					<a href="/register" class:active={$page.url.pathname === '/register'}>
						Sign up
					</a>
				</li>
			{/if}
		</ul>
	</div>
</ui>

<style>
    ul {
      list-style-type: none;
		border-radius: 10px;
      margin: 0;
      padding: 0;
      overflow: hidden;
		background-color: rgba(255, 137, 0, 0.9);

    border: 1px solid black;
    }
    
    li {
      float: left;
      border-style: none solid none solid;
      border-width: 1px;
		border-color: rgba(0, 0, 0, 0.1);
    }
    
    li a {
      display: block;
      color: white;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
    }
    
    li a:hover {
      background-color: #111;
    }
    </style>