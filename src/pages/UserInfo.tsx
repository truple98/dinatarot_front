import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserInfo.css'

interface UserInfoProps {
  onSubmit: (userInfo: { name: string; concern: string }) => void;
}

const UserInfo = ({ onSubmit }: UserInfoProps) => {
  const [name, setName] = useState<string>('');
  const [concern, setConcern] = useState<string>('');
  const [errors, setErrors] = useState<{name?: string, concern?: string}>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const concernRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: {name?: string, concern?: string} = {};

    if (!name.trim()) {
      newErrors.name = '이름을 입력해야한다요';
    }

    if (!concern.trim()) {
      newErrors.concern = '고민을 말해주는거다요.';
    } else if (concern.trim().length < 10) {
      newErrors.concern = '고민을 더 길게 말해주는거다요'
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit({ name: name.trim(), concern: concern.trim() });
      navigate('/spread-select');
    }
  };

  return (
    <div className="userinfo-container">
      <div className="userinfo-card">
        <h1 className="userinfo-title">자, 아디나에게 말해보는 거다요.</h1>

        <form onSubmit={handleSubmit} className="userinfo-form">
          <div className="input-group">
            <div className="text-field">
              <input
                ref={nameRef}
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors(prev => ({...prev, name: undefined}));
                }}
                className="text-input"
                autoComplete="name"
                required
              />
              <label htmlFor="name" className="text-label">이름은 뭐다요?</label>
              <div className="text-field-line"></div>
              {errors.name && <div className="helper-text">{errors.name}</div>}
            </div>
          </div>

          <div className="input-group">
            <div className="text-field">
              <textarea
                ref={concernRef}
                id="concern"
                value={concern}
                onChange={(e) => {
                  setConcern(e.target.value);
                  if (errors.concern) setErrors(prev => ({...prev, concern: undefined}));
                }}
                className="text-input text-area"
                maxLength={500}
                required
              />
              <label htmlFor="concern" className="text-label">고민 거리를 아디나에게 말해보는 거다요.</label>
              <div className="text-field-line"></div>
              {errors.concern && <div className="helper-text">{errors.concern}</div>}
            </div>
          </div>

          <button 
              type="submit" 
              className="submit-button"
              disabled={!name.trim() || !concern.trim()}
            >
            아디나에게 전달하기.
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;