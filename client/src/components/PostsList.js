import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts, addPost } from '../actions/postActions';

class PostsList extends Component {
	state = {
		modal: false,
	};

	schema = Yup.object().shape({
		title: Yup.string().required('Title is required'),
		content: Yup.string().required('Content is required'),
	});

	toggle = () => {
		this.setState((prevState) => ({
			modal: !prevState.modal,
		}));
	};

	componentDidMount() {
		this.props.getPosts();
	}

	static propTypes = {
		post: PropTypes.object.isRequired,
		isAuthenticated: PropTypes.bool.isRequired,
		getPosts: PropTypes.func.isRequired,
		addPost: PropTypes.func.isRequired,
	};

	render() {
		const { posts, loading } = this.props.post;

		return (
			<div className="max-w-6xl mx-auto px-4 py-8">
				{this.props.location.state !== undefined ? (
					<div className="mb-6 bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded shadow-md" role="alert">
						<p className="font-medium">{this.props.location.state.notification}</p>
					</div>
				) : null}
				
				{this.props.isAuthenticated ? (
					<div className="mb-8">
						<button 
							onClick={this.toggle}
							className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
						>
							<span className="flex items-center">
								<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
								</svg>
								Add New Post
							</span>
						</button>
					</div>
				) : null}
				
				{/* Modal */}
				{this.state.modal && (
					<div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
						<div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
							<div className="flex justify-between items-center border-b p-4">
								<h3 className="text-xl font-semibold text-gray-800">Add New Post</h3>
								<button 
									onClick={this.toggle}
									className="text-gray-400 hover:text-gray-500 focus:outline-none"
								>
									<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
							
							<Formik
								initialValues={{ title: '', content: '' }}
								validationSchema={this.schema}
								onSubmit={(values, { setSubmitting, resetForm }) => {
									this.props.addPost({
										title: values.title,
										content: values.content,
									});
									resetForm();
									this.toggle();
								}}
							>
								{({ errors, touched, isSubmitting }) => (
									<Form>
										<div className="p-4">
											<div className="mb-4">
												<label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
													Title
												</label>
												<Field
													type="text"
													name="title"
													id="title"
													className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
														errors.title && touched.title ? 'border-red-300' : 'border-gray-300'
													}`}
												/>
												{errors.title && touched.title ? (
													<p className="mt-1 text-sm text-red-600">{errors.title}</p>
												) : null}
											</div>
											
											<div className="mb-4">
												<label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
													Content
												</label>
												<Field
													as="textarea"
													name="content"
													id="content"
													rows="4"
													className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
														errors.content && touched.content ? 'border-red-300' : 'border-gray-300'
													}`}
												/>
												{errors.content && touched.content ? (
													<p className="mt-1 text-sm text-red-600">{errors.content}</p>
												) : null}
											</div>
										</div>
										
										<div className="bg-gray-50 px-4 py-3 flex justify-end space-x-3 rounded-b-lg">
											<button
												type="button"
												onClick={this.toggle}
												className="px-4 py-2 bg-white text-gray-700 font-medium rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
											>
												Cancel
											</button>
											<button
												type="submit"
												disabled={isSubmitting}
												className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-md shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
											>
												{isSubmitting ? 'Adding...' : 'Add Post'}
											</button>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				)}
				
				{/* Hero Section */}
				<div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-xl overflow-hidden mb-12">
					<div className="px-8 py-12 text-white">
						<h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Community Forum</h1>
						<p className="text-xl opacity-90 mb-6 max-w-2xl">
							Here you can find a lot of interesting posts and articles. You can also create your own posts and share
							them with the community.
						</p>
						<div className="h-1 w-16 bg-white opacity-60 mb-8"></div>
						
						{!this.props.isAuthenticated && (
							<Link to="/register">
								<button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:shadow-lg transform hover:-translate-y-0.5 transition duration-300">
									Register Now
								</button>
							</Link>
						)}
					</div>
					<div className="flex justify-end">
						
					</div>
				</div>
				
				{/* Posts List */}
				{loading ? (
					<div className="flex justify-center items-center py-12">
						<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
					</div>
				) : (
					<TransitionGroup className="space-y-6">
						{posts.map(({ _id, title, content }) => (
							<CSSTransition
								key={_id}
								timeout={500}
								classNames={{
									enter: 'opacity-0 transform translate-y-4',
									enterActive: 'opacity-100 transform translate-y-0 transition duration-500',
									exit: 'opacity-100',
									exitActive: 'opacity-0 transition duration-300',
								}}
								appear
							>
								<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
									<div className="p-6">
										<h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
										<p className="text-gray-600 mb-6 line-clamp-3">{content}</p>
										<Link to={`/post/${_id}`}>
											<button className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200">
												Read Full Post
											</button>
										</Link>
									</div>
								</div>
							</CSSTransition>
						))}
					</TransitionGroup>
				)}
				
				{/* Empty state */}
				{!loading && posts.length === 0 && (
					<div className="text-center py-12">
						<svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
						</svg>
						<h3 className="mt-2 text-xl font-medium text-gray-900">No posts yet</h3>
						<p className="mt-1 text-gray-500">Get started by creating a new post</p>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	post: state.post,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getPosts, addPost })(PostsList);