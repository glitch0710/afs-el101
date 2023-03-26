import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div>
      <Header></Header>
      <main>
        <Container className="py-3">
          <h1>Andot's Food Services</h1>
        </Container>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
