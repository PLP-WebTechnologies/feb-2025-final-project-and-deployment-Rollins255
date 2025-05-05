<?php
header('Content-Type: application/json');

// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = isset($_POST["phone"]) ? strip_tags(trim($_POST["phone"])) : '';
    $service = isset($_POST["service"]) ? strip_tags(trim($_POST["service"])) : '';
    $message = strip_tags(trim($_POST["message"]));
    
    // Validate
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["message" => "Please complete the form and try again."]);
        exit;
    }
    
    // Set recipient email (replace with your email)
    $recipient = "rollinsomondi48@gmail.com";
    
    // Set email subject
    $subject = "New contact from $name - Omore Electricals";
    
    // Build email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    if ($phone) $email_content .= "Phone: $phone\n";
    if ($service) $email_content .= "Service: $service\n";
    $email_content .= "Message:\n$message\n";
    
    // Build email headers
    $email_headers = "From: $name <$email>";
    
    // Send email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo json_encode(["message" => "Thank you! Your message has been sent."]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Oops! Something went wrong and we couldn't send your message."]);
    }
} else {
    http_response_code(403);
    echo json_encode(["message" => "There was a problem with your submission, please try again."]);
}
?>