package com.lg.user.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.lg.user.model.ErrorMessage;

@ControllerAdvice
@ResponseStatus
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler({UserNotFoundException.class, FiegnException.class, CourseNotFoundException.class, NoPathAvailable.class})
	public ResponseEntity<ErrorMessage> userLoginException(Exception exception, WebRequest request) {
		ErrorMessage message = new ErrorMessage(HttpStatus.NOT_FOUND, exception.getMessage());

		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
	}
	
	@ExceptionHandler({UserAlreadyPresent.class, CourseAlreadyEnrolled.class})
	public ResponseEntity<ErrorMessage> userAlreadyPresent(Exception exception, WebRequest request) {
		ErrorMessage message = new ErrorMessage(HttpStatus.CONFLICT, exception.getMessage());
		return ResponseEntity.status(HttpStatus.CONFLICT).body(message);
	}
	
	@ExceptionHandler({NoCoursesPresent.class, NoDoubtsException.class, NoUsersPresentException.class})
	public ResponseEntity<ErrorMessage> noContentException(Exception exception, WebRequest request) {
		ErrorMessage message = new ErrorMessage(HttpStatus.NO_CONTENT, exception.getMessage());
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body(message);
	}
	
	@ExceptionHandler({UserLoginException.class, UserNotRegisteredCourseException.class})
	public ResponseEntity<ErrorMessage> fiegnException(Exception exception, WebRequest request) {
		ErrorMessage message = new ErrorMessage(HttpStatus.UNAUTHORIZED, exception.getMessage());
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(message);
	}

}
