export const safetyTopics = [
  {
    id: 'safety_01',
    title: {
      uz: 'Karta xavfsizligi',
      ru: 'Безопасность карты',
      en: 'Card Safety'
    },
    problem: {
      uz: 'Bank kartangiz ma\'lumotlari o\'g\'irlanishi mumkin',
      ru: 'Данные вашей банковской карты могут быть украдены',
      en: 'Your bank card information can be stolen'
    },
    solution: {
      uz: 'Hech qachon karta raqami, CVV kodi va parolni boshqalar bilan bo\'lishma. Faqat ishonchli saytlarda xarid qiling. SMS orqali kelgan kodlarni hech kimga aytmang.',
      ru: 'Никогда не делитесь номером карты, CVV-кодом и паролем. Покупайте только на надежных сайтах. Не сообщайте SMS-коды никому.',
      en: 'Never share card number, CVV code and password. Shop only on trusted sites. Never tell SMS codes to anyone.'
    },
    category: 'finance'
  },
  {
    id: 'safety_02',
    title: {
      uz: 'Telegram xavfsizligi',
      ru: 'Безопасность Telegram',
      en: 'Telegram Safety'
    },
    problem: {
      uz: 'Noma\'lum odamlar yoki bot\'lar orqali aldanish',
      ru: 'Обман через неизвестных людей или ботов',
      en: 'Being deceived through unknown people or bots'
    },
    solution: {
      uz: 'Noma\'lum linklar va fayllarni ochmang. Ikki faktorli himoyani yoqing. Shaxsiy ma\'lumotlaringizni guruh chatlarda yozib qoldirmang. Rasmiy botlargagina ishoning.',
      ru: 'Не открывайте неизвестные ссылки и файлы. Включите двухфакторную защиту. Не оставляйте личную информацию в групповых чатах. Доверяйте только официальным ботам.',
      en: 'Don\'t open unknown links and files. Enable two-factor authentication. Don\'t leave personal information in group chats. Trust only official bots.'
    },
    category: 'social'
  },
  {
    id: 'safety_03',
    title: {
      uz: 'Phishing hujumlaridan himoya',
      ru: 'Защита от фишинговых атак',
      en: 'Protection from Phishing Attacks'
    },
    problem: {
      uz: 'Soxta email yoki SMS orqali parolingizni o\'g\'irlash',
      ru: 'Кража пароля через поддельные email или SMS',
      en: 'Password theft through fake emails or SMS'
    },
    solution: {
      uz: 'Bank yoki kompaniyadan kelgan xabarlardagi linkka o\'tishdan oldin, manzilni tekshiring. Hech qachon email orqali parol so\'ralsa, bermang. Rasmiy saytga o\'zingiz kiring.',
      ru: 'Перед переходом по ссылкам в сообщениях от банка или компании проверяйте адрес. Никогда не давайте пароль, если его просят по email. Заходите на официальный сайт сами.',
      en: 'Before clicking links in messages from banks or companies, check the address. Never give password if asked via email. Visit official site yourself.'
    },
    category: 'security'
  },
  {
    id: 'safety_04',
    title: {
      uz: 'Kuchli parol yaratish',
      ru: 'Создание надежного пароля',
      en: 'Creating Strong Password'
    },
    problem: {
      uz: 'Oddiy parollar osongina taxmin qilinadi',
      ru: 'Простые пароли легко угадываются',
      en: 'Simple passwords are easily guessed'
    },
    solution: {
      uz: 'Kamida 12 belgidan iborat parol yarating. Katta-kichik harflar, raqamlar va belgilarni aralashtiring. Tug\'ilgan kun yoki ismingizni ishlatmang. Har bir sayt uchun boshqa parol qo\'ying.',
      ru: 'Создайте пароль минимум из 12 символов. Смешивайте заглавные и строчные буквы, цифры и символы. Не используйте дату рождения или имя. Используйте разные пароли для каждого сайта.',
      en: 'Create password with at least 12 characters. Mix uppercase and lowercase letters, numbers and symbols. Don\'t use birth date or name. Use different passwords for each site.'
    },
    category: 'security'
  },
  {
    id: 'safety_05',
    title: {
      uz: 'Ikki faktorli autentifikatsiya',
      ru: 'Двухфакторная аутентификация',
      en: 'Two-Factor Authentication'
    },
    problem: {
      uz: 'Faqat parol yetarli himoya emas',
      ru: 'Только пароль - недостаточная защита',
      en: 'Password alone is not enough protection'
    },
    solution: {
      uz: 'Barcha muhim akkauntlaringizda 2FA ni yoqing. Google Authenticator yoki SMS kod orqali qo\'shimcha himoya qo\'shing. Agar kimdir parolingizni bilsa ham, ikkinchi kod bo\'lmasa kira olmaydi.',
      ru: 'Включите 2FA во всех важных аккаунтах. Добавьте дополнительную защиту через Google Authenticator или SMS-код. Даже если кто-то узнает пароль, без второго кода не войдет.',
      en: 'Enable 2FA in all important accounts. Add extra protection via Google Authenticator or SMS code. Even if someone knows password, they can\'t enter without second code.'
    },
    category: 'security'
  },
  {
    id: 'safety_06',
    title: {
      uz: 'Ochiq Wi-Fi tarmog\'ida xavfsizlik',
      ru: 'Безопасность в открытых Wi-Fi сетях',
      en: 'Safety in Public Wi-Fi Networks'
    },
    problem: {
      uz: 'Ochiq Wi-Fi orqali ma\'lumotlaringiz o\'g\'irlanishi mumkin',
      ru: 'Через открытый Wi-Fi могут украсть ваши данные',
      en: 'Your data can be stolen through public Wi-Fi'
    },
    solution: {
      uz: 'Jamoat Wi-Fi da bank operatsiyalari yoki muhim akkauntlarga kirmang. VPN ishlatish yaxshiroq. Faqat HTTPS li saytlarda ishlang. Fayl almashishni o\'chiring.',
      ru: 'В публичном Wi-Fi не выполняйте банковские операции и не входите в важные аккаунты. Лучше используйте VPN. Работайте только на HTTPS сайтах. Отключите общий доступ к файлам.',
      en: 'In public Wi-Fi, don\'t do banking operations or access important accounts. Better use VPN. Work only on HTTPS sites. Turn off file sharing.'
    },
    category: 'network'
  }
];
