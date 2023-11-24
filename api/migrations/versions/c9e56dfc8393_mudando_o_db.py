"""mudando o db

Revision ID: c9e56dfc8393
Revises: 
Create Date: 2023-11-15 11:42:35.918307

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c9e56dfc8393'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=64), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_user')),
    sa.UniqueConstraint('username', name=op.f('uq_user_username'))
    )
    op.create_table('casa',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nome', sa.String(length=100), nullable=False),
    sa.Column('descricao', sa.String(length=255), nullable=True),
    sa.Column('createdByUserId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['createdByUserId'], ['user.id'], name=op.f('fk_casa_createdByUserId_user')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_casa'))
    )
    op.create_table('produto',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nome', sa.String(length=100), nullable=False),
    sa.Column('descricao', sa.String(length=500), nullable=True),
    sa.Column('marca', sa.String(length=100), nullable=False),
    sa.Column('createdByUserId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['createdByUserId'], ['user.id'], name=op.f('fk_produto_createdByUserId_user')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_produto'))
    )
    op.create_table('casa_produtos',
    sa.Column('produto_id', sa.Integer(), nullable=False),
    sa.Column('casa_id', sa.Integer(), nullable=False),
    sa.Column('quantidade_desejada', sa.Integer(), nullable=False),
    sa.Column('quantidade_real', sa.Integer(), nullable=False),
    sa.Column('ativo', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['casa_id'], ['casa.id'], name=op.f('fk_casa_produtos_casa_id_casa')),
    sa.ForeignKeyConstraint(['produto_id'], ['produto.id'], name=op.f('fk_casa_produtos_produto_id_produto')),
    sa.PrimaryKeyConstraint('produto_id', 'casa_id', name=op.f('pk_casa_produtos'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('casa_produtos')
    op.drop_table('produto')
    op.drop_table('casa')
    op.drop_table('user')
    # ### end Alembic commands ###
