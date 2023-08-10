import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Auth, Amplify } from "aws-amplify";

import CircularProgress from "@mui/material/CircularProgress";

import PastGeneratedContentPage from "./components/5 - pages/PastGeneratedContentPage";
import GenerateContentPage from "./components/5 - pages/GenerateContentPage";
import UploadedFilesPage from "./components/5 - pages/UploadedFilesPage";
import UserDashboardPage from "./components/5 - pages/UserDashboardPage";
import PublicHomepage from "./components/5 - pages/PublicHomepage";
import AvatarsPage from "./components/5 - pages/AvatarsPage";
import LoginPage from "./components/5 - pages/LoginPage";

import { setToken } from "./authSlice";

Amplify.configure({
	Auth: {
		identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID || '',
		region: process.env.REACT_APP_USER_POOL_REGION || '',
		userPoolId: process.env.REACT_APP_USER_POOL_ID || '',
		userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID || '',
	},
	Storage: {
		AWSS3: {
			bucket: process.env.REACT_APP_S3_BUCKET_NAME || '',
			region: process.env.REACT_APP_S3_BUCKET_REGION || '',
		}
	}
});

const App = () => {
	const [isLoading, setIsLoading] = React.useState(true);

	const dispatch = useDispatch();
	const hasValidToken = useSelector((state: any) => state.auth.token !== null);

	React.useEffect(() => { 
		checkAuth();
	}, []);

	const checkAuth = async () => { 
		try {
			const session = await Auth.currentSession();
			const token = session.getIdToken().getJwtToken();
			dispatch(setToken(token));
		} catch (error: any) {
			dispatch(setToken(null));
		}

		setIsLoading(false);
	}

	if (isLoading) {
		return (
			<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
				<CircularProgress />
			</div>
		);
	}

	return (
		<div style={{ marginBottom: "100px" }}>
			<Routes>
				<Route path="/" element={<PublicHomepage />} />
				<Route path="/login" element={<LoginPage />} />
				{hasValidToken ? (
					<>
						<Route path="/dashboard" element={<UserDashboardPage />} />
						<Route path="/generate" element={<GenerateContentPage />} />
						<Route path="/content" element={<PastGeneratedContentPage />} />
						<Route path="/avatars" element={<AvatarsPage />} />
						<Route path="/files" element={<UploadedFilesPage />} />
					</>
				) : (
					<Route path="*" element={<LoginPage />} />
				)}
			</Routes>
		</div>
	);
};

export default App;