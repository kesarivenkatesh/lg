package com.lg.user.exception;

@SuppressWarnings("serial")
public class CourseAlreadyEnrolled extends Exception {

	public CourseAlreadyEnrolled() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CourseAlreadyEnrolled(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		// TODO Auto-generated constructor stub
	}

	public CourseAlreadyEnrolled(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	public CourseAlreadyEnrolled(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	public CourseAlreadyEnrolled(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}

}
