import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Moss · A little room for your mind',description:'Your living notebook. Linked ideas, a visual canvas, and a small companion for the journey.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}
