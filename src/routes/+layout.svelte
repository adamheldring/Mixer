<script>
	import "../app.css";
</script>

<div class="bg-slate-200 lg:min-h-screen layout-wrapper">
	<div class="top-margin lg:h-28" />
	<slot />
</div>

<style>
	@media (max-width: 850px) {
		.layout-wrapper {
			max-height: 400px;
		}
	}
</style>
