import React from 'react';
import { BibleProvider } from './context/BibleContext';
import Header from './components/Header';
import ReaderView from './components/ReaderView';
import BookChapterPicker from './components/BookChapterPicker';
import SearchModal from './components/SearchModal';
import DisplaySettingsModal from './components/DisplaySettingsModal';
import Toast from './components/Toast';

export default function App() {
  return (
    <BibleProvider>
      <div className="min-h-screen flex flex-col transition-colors duration-200">
        <Header />
        <div className="flex-1">
          <ReaderView />
        </div>
        <BookChapterPicker />
        <SearchModal />
        <DisplaySettingsModal />
        <Toast />
      </div>
    </BibleProvider>
  );
}
