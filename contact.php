<?php
// contact.php

// Replace with your email address
$recipient = "brendenedesign@gmail.com";

// Get form data and sanitize it
$name    = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email   = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

// Check if data is valid
if (!$name || !$email || !$message) {
    echo "There was a problem with your submission. Please go back and try again.";
    exit;
}

// Build the email content
$subject = "New Contact Message from $name";
$body    = "You have received a new message from your website contact form.\n\n" .
           "Name: $name\n" .
           "Email: $email\n\n" .
           "Message:\n$message\n";

// Additional headers
$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";

// Send the email
if (mail($recipient, $subject, $body, $headers)) {
    echo "Thank you for your message! We will get back to you soon.";
} else {
    echo "There was an error sending your message. Please try again later.";
}
?>
