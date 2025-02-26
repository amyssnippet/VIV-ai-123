import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import {
  Bot,
  Sparkles,
  Zap,
  Shield,
  MessageCircle,
  ArrowRight,
  Star,
  Users,
  Code,
  Globe,
} from "lucide-react";

export default function LandingPage() {
  const [demoMessage, setDemoMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { type: "bot", text: "Hello! How can I assist you today?" },
  ]);

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    if (!demoMessage.trim()) return;

    setChatMessages([
      ...chatMessages,
      { type: "user", text: demoMessage },
      { type: "bot", text: `I understand you're asking about "${demoMessage}". I'm here to help!` },
    ]);
    setDemoMessage("");
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Hero Section */}
      <div className="bg-secondary text-light position-relative overflow-hidden py-5">
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "linear-gradient(45deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
          }}
        />
        <Container className="py-5">
          <Row className="align-items-center">
            <Col lg={6} className="text-center text-lg-start mb-5 mb-lg-0">
              <h1 className="display-3 fw-bold mb-4">Experience the Future of Conversation with AI</h1>
              <p className="lead mb-4 opacity-75">
                Our advanced AI chatbot understands context, learns from interactions, and provides intelligent
                responses to help you work smarter.
              </p>
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                <Button size="lg" variant="light">
                  Get Started Free
                </Button>
                <Button size="lg" variant="outline-light">
                  View Demo
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <Card className="border-0 shadow-lg bg-dark text-white">
                <Card.Body className="p-4">
                  <div
                    className="chat-container bg-dark rounded p-3 mb-3"
                    style={{ height: "300px", overflowY: "auto" }}
                  >
                    {chatMessages.map((message, index) => (
                      <div
                        key={index}
                        className={`d-flex ${message.type === "user" ? "justify-content-end" : ""} mb-3`}
                      >
                        <div
                          className={`${
                            message.type === "user" ? "bg-primary text-white" : "bg-secondary"
                          } rounded-3 p-3 shadow-sm`}
                          style={{ maxWidth: "80%" }}
                        >
                          {message.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleDemoSubmit}>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control bg-dark text-white"
                        placeholder="Type your message..."
                        value={demoMessage}
                        onChange={(e) => setDemoMessage(e.target.value)}
                      />
                      <Button type="submit" variant="primary">
                        Send
                      </Button>
                    </div>
                  </form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Stats Section */}
      <Container className="py-5">
        <Row className="text-center g-4">
          {[{ icon: <Users size={32} />, value: "10K+", label: "Active Users" },
            { icon: <MessageCircle size={32} />, value: "1M+", label: "Messages Sent" },
            { icon: <Globe size={32} />, value: "50+", label: "Countries" },
            { icon: <Star size={32} />, value: "4.9", label: "User Rating" },
          ].map((stat, index) => (
            <Col key={index} md={3}>
              <Card className="border-0 shadow-sm h-100 text-white" style={{ backgroundColor: '#1E2837' }}>
                <Card.Body>
                  <div className="text-primary mb-3">{stat.icon}</div>
                  <h3 className="fw-bold mb-2">{stat.value}</h3>
                  <p className="text-muted mb-0">{stat.label}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Features Section */}
      <div className="bg-dark py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col lg={8} className="mx-auto">
              <Badge bg="primary" className="mb-3">
                Features
              </Badge>
              <h2 className="display-5 fw-bold mb-4">Powerful AI Capabilities</h2>
              <p className="lead text-muted">
                Experience the next generation of conversational AI with our advanced features
              </p>
            </Col>
          </Row>
          <Row className="g-4">
            {[{ icon: <Bot size={40} />, title: "Natural Language Processing", description: "Advanced AI that understands context and nuance in conversations" },
              { icon: <Sparkles size={40} />, title: "Smart Responses", description: "Intelligent, context-aware responses that adapt to your needs" },
              { icon: <Zap size={40} />, title: "Real-time Processing", description: "Lightning-fast responses with minimal latency" },
              { icon: <Shield size={40} />, title: "Secure & Private", description: "Enterprise-grade security with end-to-end encryption" },
              { icon: <Code size={40} />, title: "API Integration", description: "Easy integration with your existing applications" },
              { icon: <Users size={40} />, title: "Multi-user Support", description: "Scale from individual users to enterprise teams" },
            ].map((feature, index) => (
              <Col key={index} md={6} lg={4}>
                <Card className="border-0 shadow-sm h-100 text-white hover-lift" style={{ backgroundColor: '#1E2837' }}>
                  <Card.Body className="p-4">
                    <div className="text-primary mb-4">{feature.icon}</div>
                    <h4 className="mb-3">{feature.title}</h4>
                    <p className="text-muted mb-0">{feature.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Pricing Section */}
      <Container className="py-5">
        <Row className="text-center mb-5">
          <Col lg={8} className="mx-auto">
            <Badge bg="primary" className="mb-3">
              Pricing
            </Badge>
            <h2 className="display-5 fw-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="lead text-muted">Choose the perfect plan for your needs</p>
          </Col>
        </Row>
        <Row className="g-4 justify-content-center">
          {[{ name: "Starter", price: "0", features: ["1,000 messages/month", "Basic AI responses", "Email support", "API access"] },
            { name: "Pro", price: "49", popular: true, features: ["Unlimited messages", "Advanced AI capabilities", "Priority support", "Custom integrations", "Analytics dashboard"] },
            { name: "Enterprise", price: "Custom", features: ["Custom message volume", "Dedicated instance", "24/7 phone support", "SLA guarantee", "Custom AI training"] },
          ].map((plan, index) => (
            <Col key={index} md={6} lg={4}>
              <Card className={`border-0 shadow-sm h-100 text-white ${plan.popular ? "border border-primary" : ""}`} style={{ backgroundColor: '#1E2837' }}>
                <Card.Body className="p-4">
                  {plan.popular && (
                    <Badge bg="primary" className="position-absolute top-0 end-0 m-3">
                      Popular
                    </Badge>
                  )}
                  <h3 className="mb-3">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="display-4 fw-bold">${plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-muted">/month</span>}
                  </div>
                  <ul className="list-unstyled mb-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="mb-3 d-flex align-items-center">
                        <Sparkles className="text-primary me-2" size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant={plan.popular ? "primary" : "outline-primary"} className="w-100">
                    Get Started
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Testimonials */}
      <div className="bg-dark py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col lg={8} className="mx-auto">
              <Badge bg="primary" className="mb-3">
                Testimonials
              </Badge>
              <h2 className="display-5 fw-bold mb-4">What Our Users Say</h2>
              <p className="lead text-muted">Don't just take our word for it</p>
            </Col>
          </Row>
          <Row className="g-4">
            {[{ quote: "This AI chatbot has revolutionized how we handle customer support. Response times are down 80%!", author: "Sarah Johnson", role: "Customer Success Manager" },
              { quote: "The natural language processing is incredible. It feels like talking to a human expert.", author: "Michael Chen", role: "Software Developer" },
              { quote: "We've seen a significant boost in customer satisfaction since implementing this solution.", author: "Emma Davis", role: "Product Manager" },
            ].map((testimonial, index) => (
              <Col key={index} md={4}>
                <Card className="border-0 shadow-sm h-100 text-white" style={{ backgroundColor: '#1E2837' }}>
                  <Card.Body className="p-4">
                    <div className="mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="text-warning" size={20} fill="currentColor" />
                      ))}
                    </div>
                    <p className="mb-4">{testimonial.quote}</p>
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle bg-primary text-white p-3">{testimonial.author.charAt(0)}</div>
                      <div className="ms-3">
                        <h5 className="mb-0">{testimonial.author}</h5>
                        <small className="text-muted">{testimonial.role}</small>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* CTA Section */}
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="border-0 bg-primary text-white shadow-lg">
              <Card.Body className="p-5 text-center">
                <h2 className="display-5 fw-bold mb-4">Ready to Get Started?</h2>
                <p className="lead mb-4 opacity-75">Join thousands of satisfied users and experience the power of AI</p>
                <Button size="lg" variant="light">
                  Start Free Trial <ArrowRight className="ms-2" size={20} />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <Container className="text-center">
          <p className="mb-0">© 2025 AI Solutions, Inc. All Rights Reserved.</p>
        </Container>
      </footer>
    </div>
  );
}
