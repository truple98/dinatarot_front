import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserInfo.css'

interface UserInfoProps {
  onSubmit: (userInfo: { name: string; concern: string }) => void;
}

const UserInfo = ({ onSubmit }: UserInfoProps) => {
  const [name, setName] = useState<string>('');
  const [concern, setConcern] = useState<string>('');
  const [nameFocused, setNameFocused] = useState(false);
  const [concernFocused, setConcernFocused] = useState(false);
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

  const getFieldClass = (fieldName: 'name' | 'concern', focused: boolean, value: string) => {
    let className = 'text-field';
    if (focused) className += ' focused';
    if (value.length > 0) className += ' filled';
    if (errors[fieldName]) className += ' error';
    return className;
  };


  return (
    <div className="userinfo-container page-enter">
      <div className="userinfo-card">
        <h1 className="userinfo-title">자, 아디나에게 말해보는 거다요.</h1>

        <form onSubmit={handleSubmit} className="userinfo-form">
          <div className="input-group">
            <div className={getFieldClass('name', nameFocused, name)}>
              <input
                ref={nameRef}
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors(prev => ({...prev, name: undefined}));
                }}
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                className="text-input"
                autoComplete="name"
                placeholder=" "
              />
              <label htmlFor="name" className="text-label">이름은 뭐다요?</label>
              <div className="text-field-line"></div>
            </div>
            {errors.name && <div className="helper-text">{errors.name}</div>}
          </div>

          <div className="input-group">
            <div className={getFieldClass('concern', concernFocused, concern)}>
              <textarea
                ref={concernRef}
                id="concern"
                value={concern}
                onChange={(e) => {
                  setConcern(e.target.value);
                  if (errors.concern) setErrors(prev => ({...prev, concern: undefined}));
                }}
                onFocus={() => setConcernFocused(true)}
                onBlur={() => setConcernFocused(false)}
                className="text-input text-area"
                maxLength={100}
                placeholder=" "
              />
              <label htmlFor="concern" className="text-label">고민을 아디나에게 말해보는거다요.</label>
              <div className="text-field-line"></div>
            </div>
            {errors.concern && <div className="helper-text">{errors.concern}</div>}
            <div className={`char-counter ${concern.length > 500 ? 'error' : ''}`}>
              {concern.length}/100
            </div>
          </div>

          <button
            type="submit"
            className="submit-button animate-bounce"
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