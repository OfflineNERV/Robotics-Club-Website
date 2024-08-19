import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

export default (message: string) => {
	const ts = {
		message: message,
		background: 'variant-filled-error'
	} satisfies ToastSettings;
	getToastStore().trigger(ts);
};
