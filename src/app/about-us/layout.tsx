export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <footer>&copy; Next JS is great!</footer>
    </div>
  );
}
