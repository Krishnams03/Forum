import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const UserProfileComponent = () => {
	const { user } = useSelector((state) => state.auth);

	if (!user) return <Redirect to="/login" />;

	const userInitial = user.username?.charAt(0).toUpperCase();

	return (
		<div className="flex items-center justify-center min-h-screen bg-blue-50">
			<div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-2xxl">
				<div className="flex flex-col items-center mb-8">
					<div className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold shadow-md">
						{userInitial}
					</div>
					<h2 className="text-3xl font-semibold mt-5 text-gray-800">
						{user.username}
					</h2>
				</div>
				<dl className="space-y-6 text-lg">
					<div>
						<dt className="text-md font-medium text-gray-500">Email</dt>
						<dd className="mt-1 font-semibold text-gray-900">{user.email}</dd>
					</div>
					<div>
						<dt className="text-md font-medium text-gray-500">Created At</dt>
						<dd className="mt-1 font-semibold text-gray-900">
							{new Date(user.date).toLocaleString()}
						</dd>
					</div>
				</dl>
			</div>
		</div>
	);
};

export default UserProfileComponent;
