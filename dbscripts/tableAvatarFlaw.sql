USE [Eugenics]
GO

/****** Object:  Table [dbo].[AvatarFlaw]    Script Date: 12/23/2015 4:31:55 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[AvatarFlaw](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Str] [int] NOT NULL,
	[Mag] [int] NOT NULL,
	[Skl] [int] NOT NULL,
	[Spd] [int] NOT NULL,
	[Lck] [int] NOT NULL,
	[Def] [int] NOT NULL,
	[Res] [int] NOT NULL,
 CONSTRAINT [PK_AvatarFlaw] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[AvatarFlaw] ADD  CONSTRAINT [DF_AvatarFlaw_Str]  DEFAULT ((0)) FOR [Str]
GO

ALTER TABLE [dbo].[AvatarFlaw] ADD  CONSTRAINT [DF_AvatarFlaw_Mag]  DEFAULT ((0)) FOR [Mag]
GO

ALTER TABLE [dbo].[AvatarFlaw] ADD  CONSTRAINT [DF_AvatarFlaw_Skl]  DEFAULT ((0)) FOR [Skl]
GO

ALTER TABLE [dbo].[AvatarFlaw] ADD  CONSTRAINT [DF_AvatarFlaw_Spd]  DEFAULT ((0)) FOR [Spd]
GO

ALTER TABLE [dbo].[AvatarFlaw] ADD  CONSTRAINT [DF_AvatarFlaw_Lck]  DEFAULT ((0)) FOR [Lck]
GO

ALTER TABLE [dbo].[AvatarFlaw] ADD  CONSTRAINT [DF_AvatarFlaw_Def]  DEFAULT ((0)) FOR [Def]
GO

ALTER TABLE [dbo].[AvatarFlaw] ADD  CONSTRAINT [DF_AvatarFlaw_Res]  DEFAULT ((0)) FOR [Res]
GO


