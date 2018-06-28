<template id="modal-template">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">
					<div class="modal-header">
						<slot name="header">系统提示</slot>
						<span class="modal-header-stop" v-on:click="$emit('close')">
							</span>
					</div>
					<div class="modal-body">
						<slot name="body">default body</slot>
					</div>
					<div class="modal-footer">
						<slot name="footer"></slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<style>
	.modal-mask {
		position: absolute;
		top:0;
		left:0;
		bottom: 0;
		right: 0;
		box-sizing:border-box;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.8);
	}
	.modal-container{
		width: 80%;
		height: auto;
		position: absolute;
		top: 30%;
		left: 10%;
		background-color: white;
		border-radius: 8px;
	}
</style>