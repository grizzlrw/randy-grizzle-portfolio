import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark, a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Or any other style

export default function Code({ children, language = 'jsx' }: { children: string; language: string }) {
  return (
    <SyntaxHighlighter language={language} style={a11yDark}>
        {children}
    </SyntaxHighlighter>
  );
}