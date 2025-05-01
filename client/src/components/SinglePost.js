import React, { Component, Fragment } from 'react';
import { Formik, Form, Field } from 'formik';
import {
	Spinner,
	Button,
	FormGroup,
	Label,
	Input,
	Row,
	Col,
	FormFeedback
} from 'reactstrap';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPost, addComment } from '../actions/postActions';

class SinglePost extends Component {
	componentDidMount() {
		this.props.getPost(this.props.match.params.id);
	}

	static propTypes = {
		post: PropTypes.object.isRequired,
		getPost: PropTypes.func.isRequired,
		addComment: PropTypes.func.isRequired,
	};

	render() {
		const { post, loading, comments } = this.props.post;
		const { _id, title, content, postedAt, postedBy } = post;

		const Post = () => (
			<div className="bg-white p-6 rounded-lg shadow-md mb-6">
				<h2 className="text-2xl font-bold mb-2">{title}</h2>
				<p className="text-gray-700 mb-2">{content}</p>
				<small className="text-sm text-gray-500 block">
					Posted by: {postedBy?.username}
				</small>
				<small className="text-sm text-gray-500">
					{new Date(postedAt).toLocaleString()}
				</small>
			</div>
		);

		const Comments = () => (
			<div className="space-y-4">
				{comments.slice().reverse().map(({ _id, content, postedBy, postedAt }) => (
					<div
						key={_id}
						className="bg-gray-100 p-4 rounded-lg shadow-sm"
					>
						<h4 className="font-semibold text-gray-800">{postedBy.username}</h4>
						<p className="text-gray-700">{content}</p>
						<small className="text-xs text-gray-500 block">
							{new Date(postedAt).toLocaleString()}
						</small>
					</div>
				))}
			</div>
		);

		const schema = Yup.object().shape({
			content: Yup.string().required('Content is required!'),
		});

		return (
			<div className="container mx-auto p-4">
				{loading ? (
					<div className="flex justify-center items-center min-h-[200px]">
						<Spinner
							type="grow"
							color="primary"
							style={{ width: '3rem', height: '3rem' }}
						/>
					</div>
				) : (
					<Fragment>
						<Post />
						<Formik
							initialValues={{ content: '' }}
							validationSchema={schema}
							onSubmit={(values, { setSubmitting, resetForm }) => {
								this.props.addComment({
									id: _id,
									content: values.content,
								});
								resetForm();
								setSubmitting(false);
							}}
						>
							{({ errors, touched, isSubmitting }) => (
								<Form className="mb-6">
									<fieldset disabled={!this.props.isAuthenticated}>
										<div className="mb-4">
											<Label htmlFor="comment" className="block text-sm font-medium text-gray-700">
												Add comment
											</Label>
											<Field
												as="textarea"
												name="content"
												id="comment"
												className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 ${
													errors.content && touched.content
														? 'border-red-500'
														: ''
												}`}
												rows={4}
											/>
											{errors.content && touched.content && (
												<div className="text-red-500 text-sm mt-1">
													{errors.content}
												</div>
											)}
										</div>
										<Button
											type="submit"
											disabled={isSubmitting}
											className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
										>
											Add comment
										</Button>
									</fieldset>
								</Form>
							)}
						</Formik>
						<h3 className="text-xl font-semibold mb-4">Comments</h3>
						<Comments />
					</Fragment>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	post: state.post,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getPost, addComment })(SinglePost);
