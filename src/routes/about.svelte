<script context="module">
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="about-container">
	<h1>Om oss</h1>
	<h2>Detta är Ölklubben Utan Krus officiella hemsida.</h2>
	<p>
		Ölklubben utan krus bildades under tidigt 1990-tal. Vi är och har varit ca 6 män i våra bästa år
		som träffats en gång i månaden. På olika sätt, genom studier, boenden eller arbeten, har våra
		vägar under åren korsats och några av oss har genom det gemensamma intresset att dricka öl under
		mer organiserade former gjort just det, druckit öl tillsammans.
	</p>
	<p>
		Vi gör det tämligen vetenskapligt. En av oss ordnar en provning, fixar öl, bjuder hem de övriga.
		Turordningen cirkulerar oss emellan. Provningen är blind, endast arrangören vet vad vi dricker.
		Oftast provar vi 6-8 öl, ibland färre, ibland fler. Vi tittar på ölen, luktar på dem, smakar och
		försöker sen förklara våra intryck för varandra. Vi delar ut betyg (0-10 p) och vi rangordnar
		ölen sinsemellan. En sammanställning av samtliga provade öl och de betyg vi gett finns under
		länken ”sök”. Många öl har vi provat flera gånger. Det maximala betyget är 10 p, men har aldrig
		uppnåtts. Den bästa öl vi provat är Chimay Vit, Belgien, som fick 9,67 p. Medelvärdet 5,0 p
		motsvarar vad vi empiriskt gett ”standardölens standardöl” Carlsberg Hof.
	</p>
	<p>
		Den här sidan fyller ingen funktion mer än som ett stöd för oss själva, att minnas vad vi annars
		inte minns, samt att vara en hjälp att planera, diskutera och genomföra våra provningar så
		smidigt som möjligt.
	</p>
	<p>
		Denna sida syftar inte till att vara ett fönster mot världen, vi vill inte visa upp oss, våra
		idéer eller tankar om öl eller någonting. Vi är vi och världen är världen och på ett vis är vi
		en del av och kan månne ibland till och med ödmjukt lära av varandra. Vi frånsäger oss allt
		ansvar och tar fullt avstånd från alla eventuella kommersiella som emotionella insinuationer
		eller känslor detta kan ge upphov till. Utan krus är endast en inrättning för högst personligt
		välbefinnande och agerar såväl opolitiskt, som sexuellt och religiöst obundet.
	</p>

	<h2>Medlemmar</h2>
	<ul>
		<li>Urban Fosseus</li>
		<li>Sebastian Goksör</li>
		<li>Conny Johansson Hervén</li>
		<li>Anders Karlsson</li>
		<li>Olof Lindblad</li>
		<li>Tomas Westergren</li>
	</ul>
	<h2>Medlemmar emeritus</h2>
	<ul>
		<li>Micke Strandhed</li>
		<li>Andreas Ahlstrand</li>
		<li>Ivan Balic</li>
	</ul>
	<p>
		Man kan bli medlem i ölklubben utan krus endast genom att rekommenderas av flera nuvarande eller
		tidigare medlemmar och efter långa utdragna ceremonier och perioder av prövokaraktär.
	</p>
</div>

<style>
	.about-container {
		text-align: left;
	}
</style>
