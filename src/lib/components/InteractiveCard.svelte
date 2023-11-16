<script>
	// @ts-nocheck

	// check if we are in the browser
	import { browser } from '$app/environment';

	if (browser) {
		let card = document.querySelector('.card');
		let bounds;

		function rotateToMouse(e) {
			const mouseX = e.clientX;
			const mouseY = e.clientY;
			const leftX = mouseX - bounds.x;
			const topY = mouseY - bounds.y;
			const center = {
				x: leftX - bounds.width / 2,
				y: topY - bounds.height / 2
			};
			const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

			card.style.transform = `
            scale3d(1.07, 1.07, 1.07)
            rotate3d(
                ${center.y / 100},
                ${-center.x / 100},
                0,
                ${Math.log(distance) * 2}deg
                )
                `;

			card.querySelector('.glow').style.backgroundImage = `
                radial-gradient(
                    circle at
                    ${center.x * 2 + bounds.width / 2}px
                    ${center.y * 2 + bounds.height / 2}px,
                    #ffffff55,
                    #0000000f
                    )
                    `;
		}

		if (card) {
			card.addEventListener('mouseenter', () => {
				bounds = card?.getBoundingClientRect();
				document.addEventListener('mousemove', rotateToMouse);
			});

			card.addEventListener('mouseleave', () => {
				document.removeEventListener('mousemove', rotateToMouse);
				card.style.transform = '';
				card.style.background = '';
			});
		}
	}
</script>

<div class="card">
	<slot />
	<div class="glow" />
</div>

<style>
	.card {
		width: max-content;
		height: max-content;
		position: relative;
		transition-duration: 300ms;
		transition-property: transform, box-shadow;
		transition-timing-function: ease-out;
		transform: rotate3d(0);
	}

	.card:hover {
		transition-duration: 150ms;
		box-shadow: 0 5px 20px 5px #00000044;
	}

	.card .glow {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;

		background-image: radial-gradient(circle at 50% -20%, #ffffff22, #0000000f);
	}
</style>
