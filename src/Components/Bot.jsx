import { useState } from "react";
import { Navbar, Container, Button, Form, InputGroup, Nav, Dropdown, Spinner } from "react-bootstrap";
import { Search, Paperclip, Mic, Eye, Lightbulb, FileText, ListTodo, MoreHorizontal } from "lucide-react";
import ollama from "ollama"; // Import Ollama
import ReactMarkdown from "react-markdown";

export default function ChatInterface() {
  const [inputValue, setInputValue] = useState(""); // User input
  const [isVoiceActive, setIsVoiceActive] = useState(false); // Voice input state
  const [chatHistory, setChatHistory] = useState([]); // Store chat history
  const [isLoading, setIsLoading] = useState(false); // Show loading indicator
  const [isThinking, setIsThinking] = useState(false); // Reasoning thinking state

  // Function to handle search (sending user input to the bot)
  const handleSearch = async () => {
    if (inputValue.trim() === "") return;
    const newMessage = { sender: "user", content: inputValue };
    setChatHistory((prevHistory) => [...prevHistory, newMessage]);
    setIsLoading(true);

    try {
      const response = await ollama.chat({
        model: "xIn", // Change this to your Ollama model
        messages: [{ role: "user", content: inputValue }],
      });

      const botMessage = { sender: "bot", content: response.message.content };
      setChatHistory((prevHistory) => [...prevHistory, botMessage]);
    } catch (error) {
      console.error("Error fetching response", error);
    }

    setIsLoading(false);
    setInputValue("");
  };

  // Function to handle reason request (sending user input with model xIn-v2)
  const handleReason = async () => {
    if (inputValue.trim() === "") return;
    const newMessage = { sender: "user", content: inputValue };
    setChatHistory((prevHistory) => [...prevHistory, newMessage]);
    setIsThinking(true);

    try {
      const response = await ollama.chat({
        model: "xIn-v2", // Change this to your Ollama model
        messages: [{ role: "user", content: inputValue }],
      });

      const botMessage = { sender: "bot", content: response.message.content };
      setChatHistory((prevHistory) => [...prevHistory, botMessage]);
    } catch (error) {
      console.error("Error fetching response", error);
    }

    setIsThinking(false);
    setInputValue("");
  };

  // Function to handle voice input (using Web Speech API)
  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = () => setIsVoiceActive(true);
    recognition.onend = () => setIsVoiceActive(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
    };

    recognition.start();
  };

  // Function to handle file attachment
  const handleFileAttachment = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`File attached: ${file.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white" style={{ background: "#101826", display: "flex", flexDirection: "column" }}>
      {/* Navigation */}
      <Navbar className="border-b border-gray-700">
        <Container fluid className="px-4">
          <Navbar.Brand href="#" className="text-white d-flex align-items-center">
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="dropdown-basic" className="border-0">
                ViV Chat
              </Dropdown.Toggle>
            </Dropdown>
          </Navbar.Brand>
          <Nav className="ms-auto gap-2">
            <Button variant="dark" className="border-0">Log in</Button>
            <Button variant="light">Sign up</Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="d-flex flex-column align-items-center justify-content-center flex-grow-1" style={{ minHeight: "calc(100vh - 150px)" }}>
        {chatHistory.length === 0 && <h1 className="mb-4 text-4xl font-bold">What can I help with?</h1>}

        {/* Chat History */}
        <div className="w-100 max-w-3xl bg-grey rounded-5 p-4"
          style={{
            background: "#1E2837",
            maxHeight: "46vh",
            overflowY: chatHistory.length > 0 ? "scroll" : "hidden",
            display: chatHistory.length > 0 ? "block" : "none",
          }}>
          {chatHistory.map((message, index) => (
            <div key={index} className={`d-flex ${message.sender === "user" ? "justify-content-end" : "justify-content-start"} mb-3`}>
              <div className={`p-3 rounded-3 ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-600 text-white"}`}
                style={{
                  maxWidth: "70%",
                  backgroundColor: message.sender === "user" ? "" : "#101826",
                }}>
                <ReactMarkdown children={message.content} />
              </div>
            </div>
          ))}

          {/* Show loader while loading */}
          {(isLoading || isThinking) && (
            <div className="d-flex justify-content-center my-3">
              <Spinner animation="border" variant="light" />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="w-100 max-w-3xl mt-4">
          <InputGroup className="mb-3 bg-grey rounded-5 p-3" style={{ background: "#1E2837", padding: "10px 20px" }}>
            <Form.Control
              placeholder="Ask anything"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="bg-transparent border-0 text-white"
              style={{ boxShadow: "none", color: "white" }}
            />
            <Button variant="link" className="text-gray-400" onClick={handleFileAttachment}>
              <Paperclip size={20} />
              <input type="file" style={{ display: "none" }} onChange={handleFileAttachment} />
            </Button>
            <Button variant="dark" className="rounded-pill ms-2" onClick={handleSearch}>Search</Button>
            <Button variant="dark" className="rounded-pill ms-2" onClick={handleReason}>Reason</Button>
            <Button variant="light" className="rounded-pill ms-2" onClick={handleVoiceInput}>
              <Mic size={20} />
              {isVoiceActive ? "Stop Voice" : "Voice"}
            </Button>
          </InputGroup>
        </div>
      </Container>

      {/* Footer */}
      <footer className="fixed bottom-0 w-100 p-4 text-center text-gray-400">
        <small>
          By messaging ViV, you agree to our{" "}
          <a href="#" className="text-white">Terms</a>{" "}
          and have read our{" "}
          <a href="#" className="text-white">Privacy Policy</a>.
        </small>
      </footer>
    </div>
  );
}
