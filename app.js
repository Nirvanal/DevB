// 导航栏组件
function Navbar() {
  // 添加滚动状态
  const [scrolled, setScrolled] = React.useState(false);
  
  // 监听滚动事件
  React.useEffect(() => {
    const handleScroll = () => {
      // 当滚动超过100px时设置scrolled为true
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    // 添加滚动监听
    window.addEventListener('scroll', handleScroll);
    
    // 组件卸载时移除监听
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 切换侧边栏
  const toggleSidebar = () => {
    document.body.classList.toggle('hide-sidebar');
    document.getElementById("sidebar").classList.toggle('open');
  };

  // 切换暗黑模式
  const toggleDarkMode = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <nav id="nav" className={scrolled ? 'scrolled' : ''}>
      <span id="blog-info">
        <a href="#home" title="Nypan">
          <span className="site-name">Nypan</span>
        </a>
      </span>
      <div id="menus">
        <div className="menus_items">
          <div className="menus_item">
            <a className="site-page" href="#home">
              <span>首页</span>
            </a>
          </div>
          <div className="menus_item">
            <a className="site-page" href="#follow">
              <span>关注</span>
            </a>
          </div>
          <div className="menus_item">
            <a className="site-page" href="#discover">
              <span>发现</span>
            </a>
          </div>
          <div className="menus_item">
            <a className="site-page" href="#articles">
              <span>文章</span>
            </a>
          </div>
          <div className="menus_item">
            <a className="site-page" href="#about">
              <span>关于</span>
            </a>
          </div>
        </div>
        <div id="toggle-menu" onClick={toggleSidebar}>
          <a className="site-page">
            <i className="fas fa-bars fa-fw"></i>
          </a>
        </div>
      </div>
    </nav>
  );
}

// 英雄区域组件
function Hero() {
  // 添加滚动函数
  const scrollToContent = () => {
    document.querySelector('.recent-posts').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  // 设置背景样式
  const heroStyle = {
    backgroundImage: `url('img/background.jpg')`
  };

  return (
    <header className="full_page" id="page-header" style={heroStyle}>
      <Navbar />
      <div id="site-info">
        <h1 id="site-title">尼潘</h1>
        <div id="site-subtitle">
          <span id="subtitle">分享你的动漫世界</span>
        </div>
      </div>
      <div id="scroll-down" onClick={scrollToContent}>
        <i className="fas fa-angle-down scroll-down-effects"></i>
      </div>
    </header>
  );
}

// 发布卡片组件
function PostCard({ post, isAlt }) {
  return (
    <div className="recent-post-item">
      <div className={`post_cover ${isAlt ? 'right' : 'left'}`}>
        <a href={post.link} title={post.title}>
          <img className="post-bg" src={post.imageUrl} alt={post.title} />
        </a>
      </div>
      <div className="recent-post-info">
        <a className="article-title" href={post.link} title={post.title}>{post.title}</a>
        <div className="article-meta-wrap">
          <span className="post-meta-date">
            <i className="far fa-calendar-alt"></i>
            <span className="article-meta-label">发表于</span>
            <time>{post.date}</time>
          </span>
          {post.category && (
            <span className="article-meta">
              <span className="article-meta-separator">|</span>
              <i className="fas fa-inbox"></i>
              <a className="article-meta__categories" href={`/categories/${post.category}`}>{post.category}</a>
            </span>
          )}
          {post.tags && post.tags.length > 0 && (
            <span className="article-meta tags">
              <span className="article-meta-separator">|</span>
              <i className="fas fa-tag"></i>
              {post.tags.map((tag, index) => (
                <a key={index} className="article-meta__tags" href={`/tags/${tag}`}>{tag}</a>
              ))}
            </span>
          )}
        </div>
        <div className="content">{post.excerpt}</div>
      </div>
    </div>
  );
}

// 侧边栏卡片组件
function SidebarCard({ latestPosts }) {
  return (
    <div className="aside-content" id="aside-content">
      <div className="card-widget card-info">
        <div className="is-center">
          <div className="avatar-img">
            <img src="/img/touxiang.jpg" alt="avatar" />
          </div>
          <div className="author-info__name">akas</div>
          <div className="author-info__description">Nypan</div>
        </div>
        <div className="card-info-data site-data is-center">
          <a href="#archives">
            <div className="headline">文章</div>
            <div className="length-num">42</div>
          </a>
          <a href="#tags">
            <div className="headline">标签</div>
            <div className="length-num">7</div>
          </a>
          <a href="#categories">
            <div className="headline">分类</div>
            <div className="length-num">3</div>
          </a>
        </div>
        <a id="card-info-btn" target="_blank" href="#">
          <i className="fa fa-comments"></i>
          <span>联系作者</span>
        </a>
      </div>
      
      <div className="sticky_layout">
        <div className="card-widget card-recent-post">
          <div className="item-headline">
            <i className="fas fa-history"></i>
            <span>最新文章</span>
          </div>
          <div className="aside-list">
            {latestPosts.map((post, index) => (
              <div key={index} className="aside-list-item">
                <a className="thumbnail" href={post.link} title={post.title}>
                  <img src={post.imageUrl} alt={post.title} />
                </a>
                <div className="content">
                  <a className="title" href={post.link} title={post.title}>{post.title}</a>
                  <time>{post.date}</time>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card-widget card-webinfo">
          <div className="item-headline">
            <i className="fas fa-chart-line"></i>
            <span>网站资讯</span>
          </div>
          <div className="webinfo">
            <div className="webinfo-item">
              <div className="item-name">文章数目 :</div>
              <div className="item-count">42</div>
            </div>
            <div className="webinfo-item">
              <div className="item-name">本站总字数 :</div>
              <div className="item-count">148k</div>
            </div>
          </div>
        </div>
        
        <Calendar />
      </div>
    </div>
  );
}

// 日历组件
function Calendar() {
  return (
    <div className="card-widget lniba" id="lniba">
      <div className="item-headline">
        <i className="fa fa-calendar"></i>
        <span>厄尔科斯月历</span>
      </div>
      <div className="item-content">
        <div className="calendar-month">2025年01月</div>
        <div className="calendar-grid">
          {Array.from({ length: 31 }, (_, i) => (
            <div key={i} className={`calendar-day ${[3, 7, 12, 15, 20, 24].includes(i+1) ? 'active' : ''}`}>
              {i + 1}
            </div>
          ))}
        </div>
        <h3>日期计算器</h3>
        <div id="lnbsubmit" className="calendar-button">计算</div>
      </div>
    </div>
  );
}

// 页脚组件
function Footer() {
  return (
    <footer id="footer" style={{backgroundImage: `url('img/background.jpg')`}}>
      <div id="footer-wrap">
        <div className="copyright">&copy;2036 - 2040 By akas</div>
        <div className="framework-info">
          <span>框架 </span>
          <a target="_blank" rel="noopener" href="https://hexo.io">Hexo</a>
          <span className="footer-separator">|</span>
          <span>主题 </span>
          <a target="_blank" rel="noopener" href="https://github.com/jerryc127/hexo-theme-butterfly">Butterfly</a>
        </div>
      </div>
    </footer>
  );
}

// 返回顶部按钮
function BackToTop() {
  const [visible, setVisible] = React.useState(false);
  const [percent, setPercent] = React.useState(0);
  
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;
      const scrolled = scrollTop / (scrollHeight - clientHeight);
      
      setPercent(Math.round(scrolled * 100));
      setVisible(scrollTop > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div id="rightside" style={{display: visible ? 'block' : 'none'}}>
      <div id="rightside-config-hide">
        <button id="darkmode" type="button" title="浅色和深色模式转换" onClick={() => switchDarkMode()}>
          <i className="fas fa-adjust"></i>
        </button>
        <button id="hide-aside-btn" type="button" title="单栏和双栏切换" onClick={() => toggleSidebar()}>
          <i className="fas fa-arrows-alt-h"></i>
        </button>
      </div>
      <div id="rightside-config-show">
        <button id="go-up" type="button" title="回到顶部" onClick={scrollToTop}>
          <span className="scroll-percent">{percent}%</span>
          <i className="fas fa-arrow-up"></i>
        </button>
      </div>
    </div>
  );
}

// 主页组件
function HomePage() {
  // 模拟文章数据
  const posts = [
    {
      id: 1,
      title: 'React Hooks 最佳实践指南',
      author: '技术达人',
      date: '2024-03-15',
      imageUrl: 'https://placehold.jp/3d4070/ffffff/280x220.png?text=React+Hooks',
      link: '#article/1',
      category: '前端开发',
      tags: ['React', 'Hooks', 'JavaScript'],
      excerpt: 'React Hooks 是 React 16.8 引入的新特性，它让我们可以在函数组件中使用状态和其他 React 特性。本文将深入探讨 Hooks 的最佳实践，帮助你更好地使用这个强大的功能。'
    },
    {
      id: 2,
      title: '深入理解 TypeScript 类型系统',
      author: '代码专家',
      date: '2024-03-14',
      imageUrl: 'https://placehold.jp/3d4070/ffffff/280x220.png?text=TypeScript',
      link: '#article/2',
      category: '编程语言',
      tags: ['TypeScript', 'JavaScript'],
      excerpt: 'TypeScript 的类型系统是其最强大的特性之一。本文将带你深入了解类型系统的工作原理，以及如何利用它来编写更可靠的代码。'
    },
    {
      id: 3,
      title: 'Docker 容器化部署实战',
      author: '运维工程师',
      date: '2024-03-13',
      imageUrl: 'https://placehold.jp/3d4070/ffffff/280x220.png?text=Docker',
      link: '#article/3',
      category: 'DevOps',
      tags: ['Docker', '部署', '容器化'],
      excerpt: 'Docker 已经成为现代应用部署的标准工具。本文将通过实际案例，教你如何使用 Docker 来部署和管理你的应用程序。'
    },
    {
      id: 4,
      title: 'Python 机器学习入门教程',
      author: 'AI研究员',
      date: '2024-03-12',
      imageUrl: 'https://placehold.jp/3d4070/ffffff/280x220.png?text=Python+ML',
      link: '#article/4',
      category: '人工智能',
      tags: ['Python', '机器学习'],
      excerpt: '机器学习是人工智能的核心领域之一。本文将带你入门机器学习，从基础概念到实际应用，让你快速掌握这门技术。'
    },
    {
      id: 5,
      title: '微服务架构设计实践',
      author: '架构师',
      date: '2024-03-11',
      imageUrl: 'https://placehold.jp/3d4070/ffffff/280x220.png?text=Microservices',
      link: '#article/5',
      category: '架构设计',
      tags: ['微服务', '架构'],
      excerpt: '微服务架构已经成为现代应用开发的主流方式。本文将分享一些微服务架构设计的实践经验，帮助你构建更好的系统。'
    }
  ];

  // 获取最新的3篇文章用于侧边栏
  const latestPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

  return (
    <div className="page" id="body-wrap">
      <Hero />
      <main className="layout" id="content-inner">
        <div className="recent-posts" id="recent-posts">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} isAlt={index % 2 !== 0} />
          ))}
          <nav id="pagination">
            <div className="pagination">
              <span className="page-number current">1</span>
              <a className="page-number" href="#page/2">2</a>
              <a className="page-number" href="#page/3">3</a>
              <span className="space">…</span>
              <a className="page-number" href="#page/5">5</a>
              <a className="extend next" rel="next" href="#page/2">
                <i className="fas fa-chevron-right fa-fw"></i>
              </a>
            </div>
          </nav>
        </div>
        <SidebarCard latestPosts={latestPosts} />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

// 文章详情页面组件
function ArticlePage({ postId }) {
  // 模拟文章数据
  const article = {
    id: 1,
    title: 'React Hooks 最佳实践指南',
    author: '技术达人',
    date: '2024-03-15',
    imageUrl: 'https://placehold.jp/3d4070/ffffff/800x400.png?text=React+Hooks+Detail',
    category: '前端开发',
    tags: ['React', 'Hooks', 'JavaScript'],
    content: `
      <h2>引言</h2>
      <p>React Hooks 是 React 16.8 引入的新特性，它让我们可以在函数组件中使用状态和其他 React 特性。本文将深入探讨 Hooks 的最佳实践。</p>
      
      <h2>1. 使用 useState 管理状态</h2>
      <p>useState 是最基础的 Hook，用于在函数组件中添加状态管理。以下是一些最佳实践：</p>
      <pre><code>
const [count, setCount] = useState(0);
const [user, setUser] = useState({ name: '', age: 0 });
      </code></pre>
      
      <h2>2. useEffect 处理副作用</h2>
      <p>useEffect 用于处理组件中的副作用，如数据获取、订阅或手动修改 DOM。使用时的注意事项：</p>
      <pre><code>
useEffect(() => {
  // 执行副作用
  return () => {
    // 清理副作用
  };
}, [依赖项]);
      </code></pre>
      
      <h2>3. 自定义 Hooks</h2>
      <p>自定义 Hooks 让我们可以提取组件逻辑到可重用的函数中。例如：</p>
      <pre><code>
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
}
      </code></pre>
      
      <h2>4. 性能优化</h2>
      <p>使用 useMemo 和 useCallback 来优化性能：</p>
      <pre><code>
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
      </code></pre>
      
      <h2>5. 常见陷阱和解决方案</h2>
      <p>在使用 Hooks 时，需要注意以下几点：</p>
      <ul>
        <li>只在最顶层使用 Hooks</li>
        <li>只在 React 函数组件中调用 Hooks</li>
        <li>正确处理依赖数组</li>
        <li>避免在条件语句中使用 Hooks</li>
      </ul>
      
      <h2>总结</h2>
      <p>通过遵循这些最佳实践，我们可以更好地使用 React Hooks，编写出更清晰、可维护的代码。记住，Hooks 是一个强大的工具，但需要正确使用才能发挥其最大价值。</p>
    `,
    relatedArticles: [
      {
        id: 2,
        title: '深入理解 TypeScript 类型系统',
        imageUrl: 'https://placehold.jp/3d4070/ffffff/280x220.png?text=TypeScript',
        excerpt: 'TypeScript 的类型系统是其最强大的特性之一...'
      },
      {
        id: 3,
        title: 'Docker 容器化部署实战',
        imageUrl: 'https://placehold.jp/3d4070/ffffff/280x220.png?text=Docker',
        excerpt: 'Docker 已经成为现代应用部署的标准工具...'
      }
    ]
  };

  return (
    <div className="page" id="body-wrap">
      <Hero />
      <main className="layout" id="content-inner">
        <article className="article-content">
          <div className="article-header">
            <h1 className="article-title">{article.title}</h1>
            <div className="article-meta">
              <span className="article-author">
                <i className="fas fa-user"></i> {article.author}
              </span>
              <span className="article-date">
                <i className="far fa-calendar-alt"></i> {article.date}
              </span>
              <span className="article-category">
                <i className="fas fa-folder"></i> {article.category}
              </span>
            </div>
            <div className="article-tags">
              {article.tags.map((tag, index) => (
                <span key={index} className="article-tag">#{tag}</span>
              ))}
            </div>
          </div>
          <div className="article-cover">
            <img src={article.imageUrl} alt={article.title} />
          </div>
          <div className="article-body" dangerouslySetInnerHTML={{ __html: article.content }} />
          
          {/* 相关文章推荐 */}
          <div className="related-articles">
            <h3>相关文章</h3>
            <div className="related-articles-grid">
              {article.relatedArticles.map((related) => (
                <a key={related.id} href={`#article/${related.id}`} className="related-article-card">
                  <img src={related.imageUrl} alt={related.title} />
                  <h4>{related.title}</h4>
                  <p>{related.excerpt}</p>
                </a>
              ))}
            </div>
          </div>
        </article>
        <SidebarCard />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

// 主应用组件
function App() {
  // 添加路由状态
  const [currentPage, setCurrentPage] = React.useState('home');

  // 页面切换处理
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('article/')) {
        setCurrentPage('article');
      } else {
        setCurrentPage(hash || 'home');
      }
    };

    // 初始化和监听哈希变化
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // 渲染当前页面内容
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      
      case 'follow':
        return <FollowPage />;
      
      case 'discover':
        return <DiscoverPage />;
      
      case 'articles':
        return <ArticlesPage />;
      
      case 'login':
        return <LoginPage />;
      
      case 'article':
        const postId = window.location.hash.split('/')[1];
        return <ArticlePage postId={postId} />;
      
      default:
        return <HomePage />;
    }
  };

  return renderPage();
}

// 关注页面
function FollowPage() {
  return (
    <div className="page-content follow-page">
      <div className="page-hero">
        <h1>关注</h1>
        <p>查看你关注的创作者和他们的最新作品</p>
      </div>
      
      <div className="content">
        <div className="follow-tabs">
          <button className="tab-button active">关注的创作者</button>
          <button className="tab-button">最新更新</button>
          <button className="tab-button">推荐关注</button>
        </div>
        
        <div className="follow-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <div className="follow-card" key={index}>
              <img 
                src={`https://i.pravatar.cc/300?img=${index + 10}`} 
                alt="创作者头像" 
                className="follow-avatar" 
              />
              <h3>创作者 {index + 1}</h3>
              <p className="follow-description">动漫插画师 / 原画设计</p>
              <div className="follow-stats">
                <span>作品: {Math.floor(Math.random() * 100)}</span>
                <span>粉丝: {Math.floor(Math.random() * 1000)}</span>
              </div>
              <button className="follow-button">关注</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 发现页面
function DiscoverPage() {
  const categories = [
    { name: '推荐', icon: '⭐' },
    { name: '热门', icon: '🔥' },
    { name: '新作', icon: '✨' },
    { name: '插画', icon: '🎨' },
    { name: '漫画', icon: '📚' },
    { name: '动画', icon: '🎬' },
    { name: '壁纸', icon: '🖼️' },
    { name: '表情包', icon: '😄' }
  ];

  return (
    <div className="page-content discover-page">
      <div className="page-hero">
        <h1>发现</h1>
        <p>探索创作者的精彩作品和热门话题</p>
      </div>
      
      <div className="content">
        <div className="category-tabs">
          {categories.map((category, index) => (
            <button className={`category-button ${index === 0 ? 'active' : ''}`} key={index}>
              <span className="category-icon">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="discover-grid">
          {Array.from({ length: 12 }).map((_, index) => (
            <div className="discover-card" key={index}>
              <div className="discover-image-container">
                <img 
                  src={`https://placehold.jp/3d4070/ffffff/300x${200 + (index % 3) * 100}.png?text=发现-${index + 1}`} 
                  alt={`发现内容 ${index + 1}`} 
                  className="discover-image" 
                />
              </div>
              <div className="discover-content">
                <h3>精彩创作 #{index + 1}</h3>
                <div className="discover-meta">
                  <div className="discover-author">
                    <img 
                      src={`https://i.pravatar.cc/30?img=${index + 20}`} 
                      alt="作者头像" 
                    />
                    <span>创作者 {index + 1}</span>
                  </div>
                  <div className="discover-stats">
                    <span>❤️ {Math.floor(Math.random() * 1000)}</span>
                    <span>👁️ {Math.floor(Math.random() * 5000)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 文章页面
function ArticlesPage() {
  const articles = [
    { title: '动漫绘画入门指南：从零开始的绘画之旅', category: '教程', tags: ['绘画', '入门', '教程'] },
    { title: '2023年值得关注的十大动漫新作', category: '推荐', tags: ['动漫', '新番', '推荐'] },
    { title: '色彩理论与情感表达：动漫配色的艺术', category: '技巧', tags: ['配色', '理论', '绘画'] },
    { title: '经典动漫角色的设计解析', category: '分析', tags: ['角色设计', '分析'] },
    { title: '从构图到细节：如何提升你的插画质量', category: '教程', tags: ['构图', '教程', '进阶'] },
    { title: '数位板选购指南2023：哪款最适合动漫绘师', category: '工具', tags: ['数位板', '装备', '推荐'] }
  ];

  return (
    <div className="page-content articles-page">
      <div className="page-hero">
        <h1>文章</h1>
        <p>专业的动漫绘画教程、行业资讯和创作心得</p>
      </div>
      
      <div className="content">
        <div className="article-filters">
          <select className="article-filter">
            <option>全部分类</option>
            <option>教程</option>
            <option>推荐</option>
            <option>技巧</option>
            <option>分析</option>
            <option>工具</option>
          </select>
          
          <div className="article-search">
            <input type="text" placeholder="搜索文章..." />
            <button>搜索</button>
          </div>
        </div>
        
        <div className="articles-container">
          {articles.map((article, index) => (
            <div className="article-card" key={index}>
              <div className="article-image">
                <img 
                  src={`https://placehold.jp/3d4070/ffffff/600x400.png?text=文章封面-${index + 1}`} 
                  alt={article.title} 
                />
                <span className="article-category">{article.category}</span>
              </div>
              <div className="article-content">
                <h3>{article.title}</h3>
                <p className="article-excerpt">
                  这是一篇关于{article.tags.join('、')}的精彩文章，阅读全文可获取更多专业内容和创作灵感...
                </p>
                <div className="article-meta">
                  <div className="article-author">
                    <img src={`https://i.pravatar.cc/30?img=${index + 40}`} alt="作者头像" />
                    <span>作者名称</span>
                  </div>
                  <div className="article-date">
                    2023-{Math.floor(Math.random() * 12) + 1}-{Math.floor(Math.random() * 28) + 1}
                  </div>
                </div>
                <div className="article-tags">
                  {article.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="article-tag">#{tag}</span>
                  ))}
                </div>
                <a href="#" className="read-more">阅读全文</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 登录页面
function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>欢迎回来</h1>
          <p>登录你的尼尔科斯账号</p>
        </div>
        
        <form className="login-form">
          <div className="form-group">
            <label>用户名或邮箱</label>
            <input type="text" placeholder="请输入用户名或邮箱" />
          </div>
          
          <div className="form-group">
            <label>密码</label>
            <input type="password" placeholder="请输入密码" />
          </div>
          
          <div className="form-options">
            <label>
              <input type="checkbox" /> 记住我
            </label>
            <a href="#" className="forgot-password">忘记密码?</a>
          </div>
          
          <button type="submit" className="login-button">登录</button>
          
          <div className="social-login">
            <p>或通过以下方式登录</p>
            <div className="social-buttons">
              <button className="social-button weixin">微信</button>
              <button className="social-button qq">QQ</button>
              <button className="social-button weibo">微博</button>
            </div>
          </div>
        </form>
        
        <div className="register-link">
          还没有账号? <a href="#">立即注册</a>
        </div>
      </div>
    </div>
  );
}

// 404页面
function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <h2>页面未找到</h2>
      <p>抱歉，您访问的页面不存在或已被移除</p>
      <a href="#home" className="back-home">返回首页</a>
    </div>
  );
}

// 渲染应用
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />); 