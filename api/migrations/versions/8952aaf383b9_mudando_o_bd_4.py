"""Mudando o bd 4

Revision ID: 8952aaf383b9
Revises: e36843ff3981
Create Date: 2023-10-20 19:12:44.097951

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8952aaf383b9'
down_revision = 'e36843ff3981'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('casa_produtos', schema=None) as batch_op:
        batch_op.add_column(sa.Column('ativo', sa.Boolean(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('casa_produtos', schema=None) as batch_op:
        batch_op.drop_column('ativo')

    # ### end Alembic commands ###
