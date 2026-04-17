export const hex2rgba = (hex: string, alpha: number = 1): string => {
	const matches = hex.match(/\w\w/g);
	if (!matches) {
		return "";
	}
	const [r, g, b] = matches.map((x) => parseInt(x, 16));
	return `rgba(${r},${g},${b},${alpha})`;
};

export const navDelay: number = 1000;
export const loaderDelay: number = 2000;

export const KEY_CODES: { [key: string]: string } = {
	ARROW_LEFT: "ArrowLeft",
	ARROW_LEFT_IE11: "Left",
	ARROW_RIGHT: "ArrowRight",
	ARROW_RIGHT_IE11: "Right",
	ARROW_UP: "ArrowUp",
	ARROW_UP_IE11: "Up",
	ARROW_DOWN: "ArrowDown",
	ARROW_DOWN_IE11: "Down",
	ESCAPE: "Escape",
	ESCAPE_IE11: "Esc",
	TAB: "Tab",
	SPACE: " ",
	SPACE_IE11: "Spacebar",
	ENTER: "Enter",
};
