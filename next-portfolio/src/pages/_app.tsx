// import '@/styles/globals.css'
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "@/styles";

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
