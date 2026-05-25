export default function MainLayout({ children }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Chat Video App</h1>

      {children}
    </div>
  );
}
