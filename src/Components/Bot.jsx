import { useState } from "react";
import { Navbar, Container, Button, Form, InputGroup, Nav, Dropdown } from "react-bootstrap";
import { Search, Paperclip, Mic, Eye, Lightbulb, FileText, ListTodo, MoreHorizontal } from "lucide-react";
import axios from "axios";
import ReactMarkdown from 'react-markdown';  // Import react-markdown to render markdown

export default function ChatInterface() {
  const [inputValue, setInputValue] = useState(""); // User input
  const [isVoiceActive, setIsVoiceActive] = useState(false); // Voice input state
  const [chatHistory, setChatHistory] = useState([]); // Store chat history
  const [isLoading, setIsLoading] = useState(false); // Show loading indicator

  // Function to handle search (sending user input to the bot)
  const handleSearch = async () => {
    if (inputValue.trim() === "") return; // Prevent sending empty messages
    const newMessage = { sender: "user", content: inputValue };
    setChatHistory((prevHistory) => [...prevHistory, newMessage]); // Add user message to history
    setIsLoading(true); // Set loading state

    try {
      const searchResult = await axios.post(
        "http://ec2-13-60-168-247.eu-north-1.compute.amazonaws.com:11434/api/chat",
        {
          model: "xIn",
          messages: [{ role: "user", content: inputValue }],
          stream: false,
        }
      );
      const botMessage = {
        sender: "bot",
        content: searchResult.data.message.content,
      };
      setChatHistory((prevHistory) => [...prevHistory, botMessage]); // Add bot message to history
      setIsLoading(false); // Stop loading
      setInputValue(""); // Clear input field
    } catch (error) {
      console.error("Error fetching response", error);
      setIsLoading(false);
    }
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

  // Placeholder functions for action buttons
  const handleAnalyzeImages = () => alert("Analyze images functionality coming soon!");
  const handleBrainstorm = () => alert("Brainstorm functionality coming soon!");
  const handleSummarizeText = () => alert("Summarize text functionality coming soon!");
  const handleMakePlan = () => alert("Make a plan functionality coming soon!");
  const handleMore = () => alert("More functionality coming soon!");

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
            <Button variant="dark" className="border-0">
              Log in
            </Button>
            <Button variant="light">Sign up</Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="d-flex flex-column align-items-center justify-content-center flex-grow-1" style={{ minHeight: "calc(100vh - 150px)" }}>
        <h1 className="mb-4 text-4xl font-bold">What can I help with?</h1>

        {/* Chat History */}
        <div className="w-100 max-w-3xl bg-grey rounded-5 p-4" style={{ background: "#1E2837", maxHeight: "46vh", overflowY: "scroll" }}>
          {chatHistory.map((message, index) => (
            <div key={index} className={`d-flex ${message.sender === "user" ? "justify-content-end" : "justify-content-start"} mb-3`}>
              <div
                className={`p-3 rounded-3 ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-600 text-white"}`}
                style={{ maxWidth: "70%", backgroundColor: "#101826"}}
              >
                <ReactMarkdown children={message.content} />
              </div>
            </div>
          ))}
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
            <Button variant="link" className="text-gray-400" onClick={handleSearch}>
              <Search size={20} />
            </Button>
            <Button variant="link" className="text-gray-400" onClick={() => alert("Reasoning functionality coming soon!")}>
              Reason
            </Button>
            <Button variant="light" className="rounded-pill ms-2" onClick={handleVoiceInput}>
              <Mic size={20} />
              {isVoiceActive ? "Stop Voice" : "Voice"}
            </Button>
          </InputGroup>

          {/* Action Buttons */}
          <div className="d-flex justify-content-center gap-2 flex-wrap">
            <Button variant="dark" className="d-flex align-items-center gap-2" onClick={handleAnalyzeImages}>
              <Eye size={16} />
              Analyze images
            </Button>
            <Button variant="dark" className="d-flex align-items-center gap-2" onClick={handleBrainstorm}>
              <Lightbulb size={16} />
              Brainstorm
            </Button>
            <Button variant="dark" className="d-flex align-items-center gap-2" onClick={handleSummarizeText}>
              <FileText size={16} />
              Summarize text
            </Button>
            <Button variant="dark" className="d-flex align-items-center gap-2" onClick={handleMakePlan}>
              <ListTodo size={16} />
              Make a plan
            </Button>
            <Button variant="dark" className="d-flex align-items-center gap-2" onClick={handleMore}>
              <MoreHorizontal size={16} />
              More
            </Button>
          </div>
        </div>
      </Container>

      {/* Footer */}
      <footer className="fixed bottom-0 w-100 p-4 text-center text-gray-400">
        <small>
          By messaging ViV, you agree to our{" "}
          <a href="#" className="text-white">
            Terms
          </a>{" "}
          and have read our{" "}
          <a href="#" className="text-white">
            Privacy Policy
          </a>
          .
        </small>
      </footer>
    </div>
  );
}
