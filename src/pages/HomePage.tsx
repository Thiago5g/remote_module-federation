import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import SharedCounter from '../components/SharedCounter'

interface User {
    id: string
    name: string
    email: string
    avatar: string
    role: string
    department: string
}

interface HomePageProps {
    authToken?: string | null
    authUser?: User | null
    sharedCount?: number
    onIncrement?: () => void
    onDecrement?: () => void
}

const HomePage = ({ authToken, authUser, sharedCount, onIncrement, onDecrement }: HomePageProps) => {
    const { t } = useTranslation()
    useEffect(() => {
        console.log('[REMOTE] Props from Host updated:', {
            hasAuthToken: !!authToken,
            hasUser: !!authUser,
            sharedCount,
            hasOnIncrement: typeof onIncrement === 'function',
            hasOnDecrement: typeof onDecrement === 'function',
        })
    }, [authToken, authUser, sharedCount, onIncrement, onDecrement])

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
            <div className="max-w-5xl mx-auto space-y-6">
                <div className="text-center py-8">
                    <div className="inline-block">
                        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-3">
                            🚀 {t('remote_title')}
                        </h1>
                        <p className="text-lg text-gray-600">
                            {t('mf_sharing')}
                        </p>
                    </div>
                </div>

                {authToken && authUser ? (
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl shadow-xl border-2 border-green-300 p-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 {t('token_received')}</h2>
                        <p className="text-gray-600 mb-6">
                            The remote is authenticated and received data via Module Federation
                        </p>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
                                <p className="text-sm font-semibold text-gray-500 mb-1">👤 User</p>
                                <p className="text-lg font-bold text-gray-800">{authUser.name}</p>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
                                <p className="text-sm font-semibold text-gray-500 mb-1">📧 Email</p>
                                <p className="text-lg font-bold text-gray-800">{authUser.email}</p>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
                                <p className="text-sm font-semibold text-gray-500 mb-1">💼 Role</p>
                                <p className="text-lg font-bold text-gray-800">{authUser.role}</p>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
                                <p className="text-sm font-semibold text-gray-500 mb-1">🏢 Department</p>
                                <p className="text-lg font-bold text-gray-800">{authUser.department}</p>
                            </div>
                        </div>

                        <details>
                            <summary className="text-sm font-medium text-green-700 cursor-pointer hover:text-green-800">
                                🔑 View Full JWT Token
                            </summary>
                            <div className="mt-3 p-4 bg-gray-900 rounded-xl">
                                <code className="text-xs text-green-400 break-all font-mono block">
                                    {authToken}
                                </code>
                            </div>
                        </details>
                    </div>
                ) : (
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-3xl shadow-xl border-2 border-yellow-300 p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">⚠️ {t('not_authenticated')}</h2>
                        <p className="text-gray-700 mb-3">
                            The remote did not receive token from host. Please log in on the Home page first!
                        </p>
                        <div className="bg-white/80 rounded-xl p-4 text-sm text-gray-600">
                            <p className="font-semibold mb-1">📋 Debug:</p>
                            <p>authToken: <code className="text-red-600">{authToken === null ? 'null' : authToken === undefined ? 'undefined' : authToken}</code></p>
                            <p>authUser: <code className="text-red-600">{authUser === null ? 'null' : authUser === undefined ? 'undefined' : JSON.stringify(authUser)}</code></p>
                        </div>
                    </div>
                )}

                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-purple-100 p-8 hover:shadow-2xl transition-shadow duration-300 space-y-6">
                    <div className="flex items-start gap-4 mb-2">
                        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-3 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800">{t('shared_counter')}</h2>
                            <p className="text-gray-500 mt-1">{t('shared_counter_desc')}</p>
                        </div>
                    </div>
                    <SharedCounter 
                        value={sharedCount}
                        onIncrement={onIncrement}
                        onDecrement={onDecrement}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-purple-100 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-purple-100 rounded-xl p-2">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-xl text-purple-700">./App</h3>
                        </div>
                        <p className="text-gray-600">
                            The heart of the remote app! This is the component you're seeing right now 😎
                        </p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-pink-100 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-pink-100 rounded-xl p-2">
                                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-xl text-pink-700">./Button</h3>
                        </div>
                        <p className="text-gray-600">
                            Stylish and reusable button with color variants. Perfect for any occasion! 🎨
                        </p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl shadow-xl p-1">
                    <div className="bg-white rounded-[1.4rem] p-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-2 mt-1">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-lg text-gray-800 mb-2">🔗 {t('endpoint')}</h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    Use this link in your host to consume the components:
                                </p>
                                <div className="bg-gray-50 rounded-xl p-4 border-2 border-dashed border-purple-200">
                                    <code className="text-sm font-mono text-purple-600 break-all">
                                        http://localhost:5001/assets/remoteEntry.js
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center py-6">
                    <p className="text-gray-500 text-sm">
                        <span className="font-semibold">TGX - Solution</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HomePage;