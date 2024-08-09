import styled from "styled-components";
import { useParams } from "react-router-dom";
import { email } from "API/AuthAPI";
import Button from "common/Button";

function EmailVerifyPage() {
    const { emailId } = useParams()
    
    const sendEmail = () => {
        email({emailId: emailId})
        .then(res => {
            alert('메일이 전송되었습니다.')
        })
        .catch(err => {
        })
    }

    const mainHandle = () => {
        window.location.href="/"
    }

    return (
        <>
        <Container>
            <h1>이메일 인증을 완료해주세요</h1>
            <div className="buttonWrapper">
                <Button 
                text="인증 재전송"
                onClick={sendEmail}
                width='8rem'
                />
            </div>
            <div className="buttonWrapper">
                <Button 
                text="메인으로"
                onClick={mainHandle}
                width='8rem'
                backgroundcolor='#873ffa'
                />
            </div>
        </Container>
        </>
    )
}

export default EmailVerifyPage

const Container = styled.div`
    background-color: #0C0A15;
    height: 30rem;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .buttonWrapper {
        margin: 1rem;
    }
`