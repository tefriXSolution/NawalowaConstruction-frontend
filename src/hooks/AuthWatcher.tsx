import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkAndRefreshToken } from "@/utils";
import type { AppDispatch, RootState } from "@/types";

export default function AuthWatcher() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const userEmail = useSelector((state: RootState) => state.auth.user?.email);

    useEffect(() => {
        if (!userEmail) return;

        checkAndRefreshToken(dispatch, userEmail, navigate);

        const intervalId = setInterval(() => {
            checkAndRefreshToken(dispatch, userEmail, navigate);
        }, 30_000);

        return () => clearInterval(intervalId);
    }, [dispatch, userEmail, navigate]);

    return null; // no UI
}
